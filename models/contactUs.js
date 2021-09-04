const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    description: String,
    deletedAt: { type: String, default: null },
}, { timestamps: true })
module.exports = mongoose.model('contactus', schema)