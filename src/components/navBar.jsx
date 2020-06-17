import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={"/"}>
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        dataToggle="collapse"
        dataTarget="#navbarNav"
        ariaControls="navbarNav"
        ariaExpanded="false"
        ariaLabel="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="colapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink key="/" to={"/"} className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink
            key="/customers"
            to={"/customers"}
            className="nav-item nav-link"
          >
            Customers
          </NavLink>
          <NavLink key="/rentals" to={"/rentals"} className="nav-item nav-link">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink key="/login" to={"/login"} className="nav-item nav-link">
                Login
              </NavLink>
              <NavLink
                key="/register"
                to={"/register"}
                className="nav-item nav-link"
              >
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink
                key="/myProfile"
                to={"/myProfile"}
                className="nav-item nav-link"
              >
                {user.name}
              </NavLink>
              <NavLink
                key="/logout"
                to={"/logout"}
                className="nav-item nav-link"
              >
                Log out
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
