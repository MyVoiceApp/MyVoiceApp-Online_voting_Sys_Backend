var express = require('express');
var router = express.Router();
const Topic = require('../models/topics')
const Survey = require('../models/survey')
const Vote = require('../models/vote')
const AuthToken = require("./middleware/authentication");
var ip = require('ip');


router.post('/create', async function (req, res, next) {
    await Topic.create(req.body);
    res.json({ message: 'success' })
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await Topic.find({ deletedAt: null }).populate('category');
    res.json({ message: 'success', data: fetch });
});

router.get('/getAll_withvote', async function (req, res, next) {
    var final = [];
    var fetch = await Topic.find({ deletedAt: null }).populate('category');
    for (let i = 0; i < fetch.length; i++) {
        var cunt = await Vote.count({ topicId: fetch[i]._id, deletedAt: null });
        final.push({ topic: fetch[i], survey: cunt })
    }
    res.json({ message: 'success', data: final });
});

router.get('/getById/:id', async function (req, res, next) {
    var fetch = await Topic.findOne({ _id: req.params.id, deletedAt: null });
    res.json({ message: 'success', data: fetch });
});

router.post('/update', async function (req, res, next) {
    await Topic.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' });

});

router.delete('/delete/:id', async function (req, res, next) {
    console.log(req.body)
    await Topic.updateOne({
        _id: req.params.id
    }, {
        $set: {
            deletedAt: new Date().getTime(),
        }
    });
    res.json({ message: 'success' });

});

router.get('/search/:text', async function (req, res, next) {
    var search = req.params.text;
    var final = [];
    var localip = ip.address();

    var fetch = await Topic.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ],
    }).populate('category');

    for (let i = 0; i < fetch.length; i++) {
        var cunt = await Vote.count({ topicId: fetch[i]._id, ip: localip, deletedAt: null });
        final.push({ topic: fetch[i], survey: cunt })
    }

    res.jsonp({ message: 'success', data: final });
});

router.get('/bycategory/:id', async function (req, res, next) {
    var final = [];
    var fetch = await Topic.find({ category: req.params.id }).populate('category');
    for (let i = 0; i < fetch.length; i++) {
        var cunt = await Survey.count({ topicId: fetch[i]._id, deletedAt: null });
        final.push({ topic: fetch[i], survey: cunt })
    }
    res.jsonp({ message: 'success', data: final });
});



module.exports = router;