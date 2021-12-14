import React, { useState, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);//allow access to all state and methods used
    const [contact, setContact] = useState({
        //default object
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = e => setContact({
        ...contact,
        [e.target.name]: e.target.value
    })
    const onSubmit = e => {
        e.preventDefault();
        //pass in state variable contact to add contact to contactContext
        contactContext.addContact(contact);
        setContact({
            //set to default object
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>Add New Contact</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />
            Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} />{' '}
            Professional
            <div>
                <input type='submit' value='Add New Contact' className='btn btn-primary btn-block' />
            </div>
        </form>
    )
}

export default ContactForm
