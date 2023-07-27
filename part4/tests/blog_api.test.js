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


afterAll(async () => {
    await mongoose.connection.close()
})