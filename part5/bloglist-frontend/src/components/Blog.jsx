import {useState} from "react";

const Blog = ({ blog,updateLikes }) => {
  //default hide details and says "view"
  const [visibleDetails, setVisibleDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const text = visibleDetails ? 'hide' : 'view'
  const showWhenVisible = {display: visibleDetails ? '' : 'none'}

  const toggleVisibility = () => {
    setVisibleDetails(!visibleDetails)
  }
  const handleLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateLikes(blog.id, updatedBlog)
  }
  return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>{text}</button>
        </div>


        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'unknown'}</div>
        </div>
      </div>
  )
}
export default Blog