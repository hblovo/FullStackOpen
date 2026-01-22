import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        // 调用父组件传入的函数 (Call the function passed from parent)
        createBlog(newBlog)
        setNewBlog({ title: '', author: '', url: '' })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        value={newBlog.title}
                        onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
                    />
                </div>
                <div>
                    author:
                    <input
                        value={newBlog.author}
                        onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                    />
                </div>
                <div>
                    url:
                    <input
                        value={newBlog.url}
                        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm