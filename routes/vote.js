var express = require('express');
var router = express.Router();
const Product = require('../models/products')
const Vote = require('../models/vote')
const AuthToken = require("./middleware/authentication");
var ip = require('ip');

router.post('/create', async function (req, res, next) {
    var localip = ip.address();
    req.body.ip = localip;
    var fetch = await Vote.find({ ip: req.body.ip, topicId: req.body.topicId, deletedAt: null });
    if (fetch.length >= 3) {
        res.json({ message: 'Already_three_time_submitted' });
    } else {
        await Vote.create(req.body);
        res.json({ message: 'success' })
    }
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await Vote.find().populate('productId');
    res.json({ message: 'success', data: fetch })
});


module.exports = router;