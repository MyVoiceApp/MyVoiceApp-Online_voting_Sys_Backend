var express = require('express');
var router = express.Router();
const Category = require('../models/category')
const AuthToken = require("./middleware/authentication");


router.post('/create', async function (req, res, next) {
    await Category.create(req.body);
    res.json({ message: 'success' })
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await Category.find({ deletedAt: null });
    res.json({ message: 'success', data: fetch });

});

router.get('/getById/:id', async function (req, res, next) {
    var fetch = await Category.findOne({ _id: req.params.id, deletedAt: null });
    res.json({ message: 'success', data: fetch });
});

router.post('/update', async function (req, res, next) {
    await Category.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' });

});

router.delete('/delete/:id', async function (req, res, next) {
    console.log(req.body)
    await Category.updateOne({
        _id: req.params.id
    }, {
        $set: {
            deletedAt: new Date().getTime(),
        }
    });
    res.json({ message: 'success' });

});

module.exports = router;