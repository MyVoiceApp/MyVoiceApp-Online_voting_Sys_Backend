const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email: String,
    subject: String,
    website: String,
    description: String,
    deletedAt: { type: String, default: null },
}, { timestamps: true })
module.exports = mongoose.model('contactus', schema)