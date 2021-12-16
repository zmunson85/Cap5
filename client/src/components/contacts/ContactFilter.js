import React from 'react';
import {
    useContacts,
    filterContacts,
    clearFilter
} from '../../context/contact/ContactState';

const ContactFilter = () => {
    // need the contact dispatch without state.
    const contactDispatch = useContacts()[1];

    const onChange = (e) => {
        if (e.target.value !== '') {
            filterContacts(contactDispatch, e.target.value);
        } else {
            clearFilter(contactDispatch);
        }
    };

    return (

        <form onSubmit={(e) => e.preventDefault()}>
            <h3 className='text-primary'><i className='text-dark' class="fas fa-search"></i> Look Up A Contact </h3>
            <input type='text' placeholder='type here...' onChange={onChange} />
        </form>
    );
};

export default ContactFilter;