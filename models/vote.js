const mongoose = require('mongoose')

const schema = mongoose.Schema({
    rating: Number,
    comment: String,
    ip: String,
    deletedAt: { type: String, default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "topic" },
}, { timestamps: true })
module.exports = mongoose.model('vote', schema)