const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    deletedAt: { type: String, default: null },
}, { timestamps: true })
module.exports = mongoose.model('slider', schema)