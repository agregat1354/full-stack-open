const app = require('../app.js')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')

const api = supertest(app)

const helper = require('./blog_helper.js')

beforeEach(async () => {
    await Blog.deleteMany({})
    const promiseArray = helper.initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(promiseArray)
})

test('api\'s get /api/blogs endpoint returns correct data', async () => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body
    const titles = blogs.map(blog => blog.title)

    expect(blogs.length).toBe(helper.initialBlogs.length)
    expect(titles).toContain('Learn react')
})

test('responses are in correct form (they contain id instead of _id)', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body

    blogs.forEach(blog => expect(blog.id).toBeDefined())
    blogs.forEach(blog => expect(blog._id).not.toBeDefined())
})

test('new blog entry can be added', async () => {
    const newBlog = {
        title: "Blog test",
        author: "John Test",
        url: "https://www.blogs.com/test",
        likes: 15
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = response.body
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(addedBlog.title).toBe('Blog test')
})

test('blogs without likes property have it set to 0 by default', async () => {

    const newBlog = {
        title: "Blog test",
        author: "John Test",
        url: "https://www.blogs.com/test",
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = response.body
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(addedBlog.title).toBe('Blog test')
    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toBe(0)
})

test('trying to create blog with missing required properties return status 400', async () => {
    const newNote = {
        author: "John test",
        likes: 2
    }

    const response = await api
        .post('/api/blogs')
        .send(newNote)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('delete valid blog', async () => {
    const blogsBefore = await helper.blogsInDb()

    await api
        .delete(`/api/blogs/${blogsBefore[0].id}`)
        .expect(204)

    1


    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)

    const titles = blogsAfter.map(blog => blog.title)
    expect(titles).not.toContain(blogsBefore[0].title)
})

test('return status 400 when trying to delete non existent blog', async () => {
    const nonExistentId = await helper.nonExistentId()

    const blogsBefore = await helper.blogsInDb()

    await api
        .delete(`/api/blogs/${nonExistentId}`)
        .expect(400)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)

})

test('succesfully update blog with valid request payload', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToUpdate = blogsBefore[0]
    const id = blogToUpdate.id
    delete blogToUpdate.id
    blogToUpdate.title = "Updated title"

    const response = await api
        .put(`/api/blogs/${id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const updatedBlog = response.body
    const blogsAfter = await helper.blogsInDb()

    titles = blogsAfter.map(blog => blog.title)

    expect(blogsAfter.length).toBe(blogsBefore.length)
    expect(blogToUpdate.title).toBe(updatedBlog.title)
    expect(titles).toContain(updatedBlog.title)
})

test('return code 400 after trying to update non existent blog', async () => {
    const nonExistentId = await helper.nonExistentId()

    const blogsBefore = await helper.blogsInDb()

    const updatedBlog = {
        title: "title",
        author: "author",
        url: "url",
        likes: 0
    }

    await api
        .put(`/api/blogs/${nonExistentId}`)
        .send(updatedBlog)
        .expect(400)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter).toEqual(blogsBefore)

})

afterAll(async () => {
    await mongoose.connection.close()
})