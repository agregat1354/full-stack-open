const app = require('../app.js')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Learn react",
        author: "Dan Abramov",
        url: 'https://rect.dev',
        likes: 15
    },
    {
        title: "Innovative fighting techniques",
        author: "Steven Segal",
        url: 'https://www.steven-segal.blog/fighting',
        likes: 1354
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const promiseArray = initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(promiseArray)
})

test('api\'s get /api/blogs endpoint returns correct data', async () => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body
    const titles = blogs.map(blog => blog.title)

    expect(blogs.length).toBe(initialBlogs.length)
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

afterAll(async () => {
    await mongoose.connection.close()
})