const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
blogsRouter.get('/',async (request, response)=>{
    const blogs = await Blog
        .find({})
        .populate('user','username name')

    response.json(blogs)

})
blogsRouter.post('/',async (request, response, next) => {
    const body = request.body
    const user = await User.findOne({})
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(200).json(savedBlog)
    } catch (e) {
        next(e)
    }

})
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const id = request.params.id
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})
blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body // 这里的 likes 必须对应前端传来的属性名
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        {likes : likes},
        {new : true}
    )

    response.json(updatedBlog)
})
module.exports = blogsRouter