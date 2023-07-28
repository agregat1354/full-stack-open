const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)

})

module.exports = userRouter