const logger = require('./logger.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const config = require('./config.js')

const errorHandler = (error, request, response, next) => {
    logger.info(error)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!(decodedToken.id && decodedToken.username)) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({ error: "invalid token" })
    }

    request.user = user
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}