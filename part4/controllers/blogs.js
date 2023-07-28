const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = new Blog({ title, author, url, likes })
    const users = await User.find({})
    const user = users[0]

    blog.user = user.id

    user.blogs = user.blogs.concat(blog.id)
    await user.save()

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

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const updatedObject = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { runValidators: true, new: true, context: 'query' })

    if (updatedObject) {
        response.status(200).json(updatedObject)
    } else {
        response.status(400).end()
    }
})


module.exports = blogsRouter