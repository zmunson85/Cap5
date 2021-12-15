import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useContacts, clearContacts } from '../../context/contact/ContactState';

const Navbar = ({ title, icon }) => {
    const [authState, authDispatch] = useAuth();
    const { isAuthenticated, user } = authState;

    const contactDispatch = useContacts()[1];

    const onLogout = () => {
        logout(authDispatch);
        clearContacts(contactDispatch);
    };

    const authLinks = (
        <Fragment>
            <li style={{ marginRight: '40vw', fontSize: 'larger' }}>Hello {user && user.name}</li>
            <li>
                <Link onClick={onLogout} to='/login'>
                    <i style={{ fontSize: 'larger' }} className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <Link to='/'>
                    <i className={icon} /> {title}
                </Link>
            </h1>
            <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'List My Contacts',
    icon: 'fas fa-id-card-alt'
};

export default Navbar;