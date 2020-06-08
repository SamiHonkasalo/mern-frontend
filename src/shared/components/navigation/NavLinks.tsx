import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import AuthContext from '../../context/auth-context';

const NavLinks: React.FC = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`} exact>
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new" exact>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn ? (
        <li>
          <NavLink to="/auth" exact>
            AUTHENTICATE
          </NavLink>
        </li>
      ) : (
        <li>
          <button type="button" onClick={auth.logout}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
