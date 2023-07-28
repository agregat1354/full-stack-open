const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: { type: String, minLength: 3, unique: true },
    name: { type: String },
    passwordHash: { type: String },
    blogs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret.passwordHash
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('User', userSchema)