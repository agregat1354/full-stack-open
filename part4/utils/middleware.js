const logger = require('./logger.js')

const errorHandler = (error, request, response, next) => {
    logger.info(error)

    if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    errorHandler
}