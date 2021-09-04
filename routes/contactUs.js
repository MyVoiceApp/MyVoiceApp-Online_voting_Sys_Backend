var express = require('express');
var router = express.Router();
const ContactUs = require('../models/contactUs')


router.post('/create', async function (req, res, next) {
    await ContactUs.create(req.body);
    res.json({ message: 'success' })
});

router.get('/getAll', async function (req, res, next) {
    var fetch = await ContactUs.find({ deletedAt: null });
    res.json({ message: 'success', data: fetch });

});


module.exports = router;