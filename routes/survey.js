var express = require('express');
var router = express.Router();
const Survey = require('../models/survey')
const AuthToken = require("./middleware/authentication");


router.post('/create', async function (req, res, next) {
    var fetch = await Survey.find({ user: req.body.user, topicId: req.body.topicId, deletedAt: null });

    if (fetch.length >= 3) {
        res.json({ message: 'already three time survey submitted' });
    } else {
        await Survey.create(req.body);
        res.json({ message: 'success' })
    }
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await Survey.find({ deletedAt: null }).populate('topicId  productId user');
    res.json({ message: 'success', data: fetch });

});

router.get('/getById/:id', async function (req, res, next) {
    var fetch = await Survey.findOne({ _id: req.params.id, deletedAt: null });
    res.json({ message: 'success', data: fetch });
});

router.post('/update', AuthToken, async function (req, res, next) {
    await Survey.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' });

});

router.delete('/delete/:id', AuthToken, async function (req, res, next) {
    console.log(req.body)
    await Survey.updateOne({
        _id: req.params.id
    }, {
        $set: {
            deletedAt: new Date().getTime(),
        }
    });
    res.json({ message: 'success' });

});

module.exports = router;