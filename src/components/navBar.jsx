import React from "react";

function NavBar(props) {
  return (
    <nav className="navbar">
      <h1> {props.title}</h1>
    </nav>
  );
}

export default NavBar;
