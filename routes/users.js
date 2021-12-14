const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

//@route POST api/users
//@description Register a user
//@access Public
router.post('/', [
    check('name', 'You must enter your name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Your password must be at least 6 characters!')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    res.send('passed')
});

module.exports = router;