var express = require('express');
var router = express.Router();
const Product = require('../models/products')
const voteProduct = require('../models/voteProduct')
const AuthToken = require("./middleware/authentication");
var ip = require('ip');

router.post('/create', async function (req, res, next) {
    var localip = ip.address();
    req.body.ip = localip;
    var fetch = await voteProduct.find({ ip: req.body.ip, productId: req.body.productId, deletedAt: null });
    if (fetch.length >= 3) {
        res.json({ message: 'already three time vote submitted' });
    } else {
        await voteProduct.create(req.body);
        res.json({ message: 'success' })
    }
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await voteProduct.find().populate('productId');
    res.json({ message: 'success', data: fetch })
});


module.exports = router;