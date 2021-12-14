const express = require('express');
const router = express.Router();


//@route GET api/auth
//@description Get logged in user
//@access Private
router.get('/', (req, res) => {
    res.send('Get Logged In user')
});
//@route Post api/auth
//@description Auth User & Get Token
//@access Public
router.post('/', (req, res) => {
    res.send('Login User')
});

module.exports = router;