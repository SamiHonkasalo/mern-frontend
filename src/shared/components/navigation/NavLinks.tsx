import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

interface Props {}

const NavLinks = (props: Props) => {
    return (
        <ul className="nav-links">
            <NavLink to="/">ALL USERS</NavLink>
            <NavLink to="/u1/places">MY PLACES</NavLink>
            <NavLink to="/places/new">ADD PLACE</NavLink>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </ul>
    );
};

export default NavLinks;
