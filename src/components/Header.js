import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div>
        <NavLink to="/" exact activeClassName="active-link" className="link">
          MY SHELVES
        </NavLink>
        <NavLink
          exact
          to="/search"
          activeClassName="active-link"
          className="margin-left-20 link"
        >
          SEARCH
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
