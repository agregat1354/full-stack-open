const app = require('../app.js')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const api = supertest(app)

const helper = require('./blog_helper.js')

beforeAll(async () => {
    await User.deleteMany({})
    const newUser = {
        username: "mariuszbrz",
        name: "Mariusz Brzózka",
        password: "mariuszek321"
    }
    const initialUsers = [...helper.initialUsers, newUser]
    const promiseArray = initialUsers.map(user => {
        return api
            .post('/api/users')
            .send(user)
    })
    await Promise.all(promiseArray)

})

beforeEach(async () => {
    await Blog.deleteMany({})
    const promiseArray = helper.initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(promiseArray)

    const usersNewBlog = {
        title: "Blog for testing",
        author: 'irrelevant',
        url: 'https://www.nonexistentwebsite/test',
        likes: 15
    }

    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)

    const blogCreationResponse = await api
        .post('/api/blogs')
        .send(usersNewBlog)
        .auth(loginResponse.body.token, { type: 'bearer' })

})

test('api\'s get /api/blogs endpoint returns correct data', async () => {

    const blogsBeforeGet = await helper.blogsInDb()

    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    // another valid option for sending auth
    // .set('authorization', `Bearer ${loginResponse.token}`)
    const response = await api
        .get('/api/blogs')
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body
    const titles = blogs.map(blog => blog.title)

    expect(blogs.length).toBe(blogsBeforeGet.length)
    expect(titles).toContain('Learn react')
})

test('responses are in correct form (they contain id instead of _id)', async () => {


    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body

    blogs.forEach(blog => expect(blog.id).toBeDefined())
    blogs.forEach(blog => expect(blog._id).not.toBeDefined())
})

test('new blog entry can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const newBlog = {
        title: "Blog test",
        author: "John Test",
        url: "https://www.blogs.com/test",
        likes: 15
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = response.body
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
    expect(addedBlog.title).toBe('Blog test')
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

test('blogs without likes property have it set to 0 by default', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const newBlog = {
        title: "Blog test",
        author: "John Test",
        url: "https://www.blogs.com/test",
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = response.body
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
    expect(addedBlog.title).toBe('Blog test')
    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toBe(0)
})

test('trying to create blog with missing required properties return status 400', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const newNote = {
        author: "John test",
        likes: 2
    }

    const response = await api
        .post('/api/blogs')
        .send(newNote)
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
})

test('delete valid blog', async () => {
    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const user = await User.findOne({ username: loginResponse.body.username }).populate('blogs')
    const blog = user.blogs[0]

    const blogsBefore = await helper.blogsInDb()


    await api
        .delete(`/api/blogs/${blog.id}`)
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(204)


    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)

    const titles = blogsAfter.map(blog => blog.title)
    expect(titles).not.toContain(blog.title)
})

test('return status 400 when trying to delete non existent blog', async () => {
    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)



    const nonExistentId = await helper.nonExistentId()

    const blogsBefore = await helper.blogsInDb()

    await api
        .delete(`/api/blogs/${nonExistentId}`)
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(400)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)

})

test('succesfully update blog with valid request payload', async () => {
    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)



    const blogsBefore = await helper.blogsInDb()
    const blogToUpdate = blogsBefore[0]
    const id = blogToUpdate.id
    delete blogToUpdate.id
    blogToUpdate.title = "Updated title"

    const response = await api
        .put(`/api/blogs/${id}`)
        .send(blogToUpdate)
        .auth(loginResponse.body.token, { type: 'bearer' })
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
    const loginRequest = {
        username: "mluukkai",
        password: "salainen"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(loginRequest)
        .expect(200)
        .expect('Content-Type', /application\/json/)



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
        .auth(loginResponse.body.token, { type: 'bearer' })
        .expect(400)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter).toEqual(blogsBefore)

})


describe('user tests', () => {


    test('when sending valid payload, valid user can be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "mariuszbrz1",
            name: "Mariusz Brzózka",
            password: "mariuszek321"
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newlyAddedUser = response.body
        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)

        expect(usernames).toContain(newUser.username)
        expect(newlyAddedUser.username).toBeDefined()
        expect(newlyAddedUser.name).toBeDefined()
        expect(newlyAddedUser.id).toBeDefined()
    })

    test('adding user with non-unique username should fail with suitable status code and error message', async () => {
        const usersAtStart = await helper.usersInDb()

        const nonUniqueUser = {
            "username": "grzegorzb",
            "name": "Grzegorz Bażant",
            "password": "supersecretpassword"
        }

        const response = await api
            .post('/api/users')
            .send(nonUniqueUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(response.body.error).toBeDefined()

        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })

    test('adding user with too short password should fail with suitable status code and error message', async () => {
        const usersAtStart = await helper.usersInDb()

        const userWithTooShortPassword = {
            "username": "grzegorzb",
            "name": "Grzegorz Bażant",
            "password": "ss"
        }

        const response = await api
            .post('/api/users')
            .send(userWithTooShortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBeDefined()

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})


afterAll(async () => {

    const userToDelete = await User.findOne({ username: 'mariuszbrz' })
    await User.findByIdAndDelete(userToDelete._id)

    await mongoose.connection.close()
})