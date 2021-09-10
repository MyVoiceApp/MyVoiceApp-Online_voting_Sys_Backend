const mongoose = require('mongoose')

const schema = mongoose.Schema({
    rating: Number,
    comment: String,
    ip: String,
    deletedAt: { type: String, default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
}, { timestamps: true })
module.exports = mongoose.model('voteProduct', schema)