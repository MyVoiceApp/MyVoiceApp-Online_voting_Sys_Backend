var express = require('express');
var router = express.Router();
const Product = require('../models/products')
const Survey = require('../models/survey')
const AuthToken = require("./middleware/authentication");
const voteProduct = require('../models/voteProduct')


router.post('/create', async function (req, res, next) {
    await Product.create(req.body);
    res.json({ message: 'success' })
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await Product.find({ deletedAt: null }).populate('category');
    res.json({ message: 'success', data: fetch });
});

router.get('/getAll_withsurvey', async function (req, res, next) {
    var final = [];
    var fetch = await Product.find({ deletedAt: null }).populate('category');
    for (let i = 0; i < fetch.length; i++) {
        var cunt = await voteProduct.count({ productId: fetch[i]._id, deletedAt: null });
        final.push({ product: fetch[i], vote: cunt })
    }
    res.json({ message: 'success', data: final });
});


router.get('/getById/:id', async function (req, res, next) {
    var fetch = await Product.findOne({ _id: req.params.id, deletedAt: null });
    res.json({ message: 'success', data: fetch });
});

router.post('/update', async function (req, res, next) {
    await Product.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' });

});

router.delete('/delete/:id', async function (req, res, next) {
    console.log(req.body)
    await Product.updateOne({
        _id: req.params.id
    }, {
        $set: {
            deletedAt: new Date().getTime(),
        }
    });
    res.json({ message: 'success' });

});


module.exports = router;