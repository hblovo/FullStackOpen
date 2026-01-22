import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const credentials = {username,password}
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

    }catch(err){
      console.log(err)
    }
  }
  const handleLogout = async(event)=>{
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const createBlog = async (newBlog)=>{
    try{
      const returnedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      console.log(returnedBlog)
    }catch (err){
      console.log('Error creating blog',err)
    }
  }
  if(user === null){
    return(
        <div>
          <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
          />
        </div>
    )
  }else{
    return(
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm createBlog={createBlog} />

          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
  }
}

export default App