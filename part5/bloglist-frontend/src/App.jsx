import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification.jsx";
import './index.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [notification, setNotificaiton] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const [blogVisible, setBlogVisible] = useState(false)
  const notify = (message,type='success')=>{
    setNotificationType(type)
    setNotificaiton(message)
    setTimeout(()=>{
      setNotificaiton(null)
    },3000)
  }
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
      notify('wrong username or password','error')
    }
  }
  const handleLogout = async(event)=>{
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setBlogVisible(true)}>new blog</button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm createBlog={createBlog} />
            <button onClick={() => setBlogVisible(false)}>cancel</button>
          </div>
        </div>
    )
  }
  const createBlog = async (newBlog)=>{
    try{
      const returnedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setBlogVisible(false)
      notify(`a new blog ${newBlog.title} added by ${newBlog.author}`, 'success')
      console.log(returnedBlog)
    }catch (err){
      console.log('Error creating blog',err)
      notify('failed to create blog', 'error')
    }
  }
  const updateLikes = async(id, blog)=>{
    try{
      const updatedBlog = await blogService.updateBlog(id, blog)
      setBlogs(blogs.map(blog=> blog.id !== id ? blog : { ...updatedBlog, user: blog.user }))
    }catch (err){
      notify('could not update likes',err)
    }
  }
  if(user === null){
    return(
        <div>
          <Notification message={notification} type={notificationType} />
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
          <Notification message={notification} type={notificationType} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.map(blog => <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />)}
        </div>
    )
  }
}

export default App