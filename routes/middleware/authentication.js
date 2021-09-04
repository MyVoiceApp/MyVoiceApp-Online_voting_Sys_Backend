var jwt = require('jsonwebtoken');

const secret = 'very-long-string-for-secret';
var auth = function (req, res, next) {
    var token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = auth;