import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/photos/new">ADD PHOTO</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Login/ Signup</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
