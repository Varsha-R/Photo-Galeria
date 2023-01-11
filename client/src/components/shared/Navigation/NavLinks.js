import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = { isLoggedIn: true, userId: "234323" };

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/photos`}>MY PHOTOS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/photos/new">ADD PHOTO</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login/ Signup</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">
            <button onClick={auth.logout} style={{ border: "none" }}>
              LOGOUT
            </button>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;