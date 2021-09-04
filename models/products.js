const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    vote: Number,
    image: String,
    description: String,
    deletedAt: { type: String, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })
module.exports = mongoose.model('product', schema)