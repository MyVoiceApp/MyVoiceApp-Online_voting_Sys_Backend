const mongoose = require('mongoose')

const schema = mongoose.Schema({
    rating: Number,
    comment: String,
    workingplace: String,
    workName: String,
    fullname: String,
    workingplace: String,
    deletedAt: { type: String, default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })
module.exports = mongoose.model('survey', schema)