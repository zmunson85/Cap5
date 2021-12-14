import React, { useReducer } from 'react';
import { v4 as uuid } from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';


import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Billy Madison',
                email: 'BM@g.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Joe Madison',
                email: 'JM@g.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Jill Madison',
                email: 'JillM@g.com',
                phone: '222-222-2222',
                type: 'professional'
            }

        ],
        //set current state to null
        current: null
    };
    //state allows us to grab anything in state and dispatch allows us to send objects through the contactReducer
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add New Contact

    const addContact = contact => {
        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    //Delete Contact needs id 
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }

    //Set Current COntact

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    return (
        //all methods are added to context so they can be used in the front end
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                deleteContact
            }}>
            {props.children}
        </ContactContext.Provider>
    );

};
export default ContactState;