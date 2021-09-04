var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const AuthToken = require("./middleware/authentication");
const { sendEmail } = require('../helpers/emailTamplate');

// create Admin
router.post('/create', async function (req, res, next) {
    var isExist = await User.findOne({ email: req.body.email, role: 'Admin', deletedAt: null });
    if (isExist) {
        res.json({ message: 'Already Exist' })
    } else {
        req.body.password = passwordHash.generate(req.body.password)
        User.create(req.body);
        res.json({ message: 'success' })
    }
});

// Signin Admin
router.post('/signin', async function (req, res, next) {
    var isExist = await User.findOne({ email: req.body.email, role: 'Admin' })
    if (isExist) {
        const isAuth = passwordHash.verify(req.body.password, isExist.password)
        if (isAuth) {
            const token = jwt.sign({ _id: req.body.email, id: isExist._id },
                'very-long-string-for-secret', { expiresIn: '365d' },
            ) // expires in 24 hours

            return res.json({
                token: token,
                data: isExist,
                message: 'success',
            })
        } else {
            res.json({ message: 'Un Authorized' })
        }
    } else {
        res.json({ message: 'Un Authorized' })
    }
})

router.post('/sendEmail', async function (req, res, next) {
    sendEmail();
    res.json({ message: 'success' })
})

// getById
router.get('/:id', AuthToken, async function (req, res, next) {
    var gt = await User.findOne({ _id: req.params.id });
    res.json({ message: 'success', data: gt });

});

// update
router.post('/update', AuthToken, async function (req, res, next) {
    User.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    }).then(fetch => {
        res.json({ message: 'success' });
    });
});

module.exports = router;