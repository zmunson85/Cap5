const express = require('express');
const router = express.Router();


//@route Get api/contacts
//@description Get all logged in user contacts
//@access Public
router.get('/', (req, res) => {
    res.send('Get all contacts')
});
//@route Post api/contacts
//@description Add new contact
//@access Private
router.post('/', (req, res) => {
    res.send('Add New Contact')
});
//@route Put api/contacts/:id
//@description Get all logged in user contacts
//@access Public
router.put('/:id', (req, res) => {
    res.send('Update Contact')
});
//@route DELETE api/
//@description Get all logged in user contacts
//@access Public
router.delete('/:id', (req, res) => {
    res.send('Delete Contact')
});

module.exports = router;