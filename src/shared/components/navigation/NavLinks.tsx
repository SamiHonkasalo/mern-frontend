import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

interface Props {}

const NavLinks = (props: Props) => {
    return (
        <ul className="nav-links">
            <NavLink to="/" exact>
                ALL USERS
            </NavLink>
            <NavLink to="/u1/places" exact>
                MY PLACES
            </NavLink>
            <NavLink to="/places/new" exact>
                ADD PLACE
            </NavLink>
            <NavLink to="/auth" exact>
                AUTHENTICATE
            </NavLink>
        </ul>
    );
};

export default NavLinks;
