const mongoose = require('mongoose')

const schema = mongoose.Schema({
    rating: Number,
    comment: String,
    deletedAt: { type: String, default: null },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "topic" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })
module.exports = mongoose.model('survey', schema)