const mongoose = require('mongoose')

const schema = mongoose.Schema({
    rating: Number,
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "topic" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    comment: String,
    deletedAt: { type: String, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })
module.exports = mongoose.model('survey', schema)