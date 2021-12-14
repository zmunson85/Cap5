const express = require('express');
const router = express.Router();

//middleware for protected routes
const auth = require('../middleware/auth')
//express validator
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
const Contact = require('../models/Contacts')




//@route Get api/contacts
//@description Get all logged in user contacts
//@access Private, protected route with auth parameter
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
//@route Post api/contacts
//@description Add new contact
//@access Private
router.post('/', auth,
    [
        check('name', 'Name is Required').not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //pull data from body
        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }

    });
//@route Put api/contacts/:id
//@description Get all logged in user contacts
//@access Public
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    //contact object based on user submission
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        //request params in the findById
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //make sure user is updating their own contact list
        if (contact.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Not allowed to edit other user contacts. ' });
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields },
            { new: true });
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});
//@route DELETE api/
//@description Get all logged in user contacts
//@access Public
router.delete('/:id', auth, async (req, res) => {
    try {
        //request params in the findById
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //make sure user is updating their own contact list
        if (contact.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Not allowed to edit other user contacts. ' });
        }
        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact Has Been Deleted From DB' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;