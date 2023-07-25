const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config.js")
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs.js')


const Blog = require('./models/blog.js')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => console.log("succesfully connected to mongodb"))
    .catch(error => console.log("failed to connect to mongodb", error))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


module.exports = app