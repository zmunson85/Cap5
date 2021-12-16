import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useContacts, clearContacts } from '../../context/contact/ContactState';

const Navbar = ({ title, icon, about, icon2 }) => {
    const [authState, authDispatch] = useAuth();
    const { isAuthenticated, user } = authState;

    const contactDispatch = useContacts()[1];

    const onLogout = () => {
        logout(authDispatch);
        clearContacts(contactDispatch);
    };

    const authLinks = (
        <Fragment>
            <li style={{ margin: 'auto', fontSize: 'larger' }}>{user && user.name} Is Logged In!</li>
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
            <h2>
                <Link to='/'>
                    <i className={icon} /> {title}
                </Link>
            </h2>
            <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
            <h2>
                <Link to='/about'>
                    <i className={icon2} /> {about}
                </Link>
            </h2>
        </div>
    );
};

Navbar.propTypes = {
    about: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    icon2: PropTypes.string
};

Navbar.defaultProps = {
    title: 'List My Contacts',
    about: 'About App',
    icon: 'fas fa-id-card-alt',
    icon2: 'fas fa-question-circle'
};

export default Navbar;