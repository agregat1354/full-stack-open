const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const deletedBlog = await Blog.findByIdAndRemove(id)

    if (deletedBlog) {
        response.status(204).end()
    } else {
        response.status(400).json({ error: "blog with given id does not exist" })
    }
})


module.exports = blogsRouter