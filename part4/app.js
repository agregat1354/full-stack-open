const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config.js")
require('express-async-errors')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const { errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware.js')


const blogsRouter = require('./controllers/blogs.js')
const userRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

const Blog = require('./models/blog.js')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => logger.info("succesfully connected to mongodb"))
    .catch(error => logger.info("failed to connect to mongodb", error))

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)


app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app