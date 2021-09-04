const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    email: String,
    role: String,
    password: String,
    image: String,
    bio: String,
    lang: String,
    deletedAt: { type: String, default: null },
}, { timestamps: true })
module.exports = mongoose.model('user', schema)