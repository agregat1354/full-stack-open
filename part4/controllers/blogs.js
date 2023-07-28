const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config.js')
const blog = require('../models/blog.js')


/*
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}
*/

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    const user = request.user

    const blog = new Blog({ title, author, url, likes })

    blog.user = user.id

    user.blogs = user.blogs.concat(blog.id)
    await user.save()

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const user = request.user

    const blogToDelete = await Blog.findById(id)

    if (user._id.toString() !== blogToDelete.user.toString()) {
        return response.status(401).json({ error: 'you are not allowed to delete this blog' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogToDelete._id.toString())

    user.blogs = user.blogs.filter(blog => blog._id.toString() !== id)
    await user.save()

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