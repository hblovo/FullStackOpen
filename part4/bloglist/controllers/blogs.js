const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',(request, response)=>{
    Blog.find({}).then(blogs=>{
        response.json(blogs)
    })
})
blogsRouter.post('/',async (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })
    try {
        const savedBlog = await blog.save()
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