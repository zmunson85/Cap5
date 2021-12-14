//Function that has access to the request and response cycle & request and response object. Looking for token in the header. Bringing in json web token. 

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get the token from the header
    //key x-auth-token
    const token = req.header('x-auth-token');

    //check if token is valid/exists
    //only for protected routes
    if (!token) {
        //unauthorized status code is 401
        return res.status(401).json({ msg: 'No User Found, Please Login to reach this page! ' });
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //pull out payload "TOKEN VALUE"
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token invalid, please add a valid JSON TOKEN!' })
    }

};