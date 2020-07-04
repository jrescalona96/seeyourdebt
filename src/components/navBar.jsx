import React, { useState } from "react";
import ToggleSwitch from "./common/toggleSwitch";
import Icon from "./common/icon";
import { useEffect } from "react";
import logo from "../assets/logo.png";
const NavBar = ({ doSetTheme, title, theme }) => {
  const [activeSun, setActiveSun] = useState(true);
  const [activeMoon, setActiveMoon] = useState(false);

  useEffect(() => {
    const status = theme === "darkTheme";
    setActiveMoon(status);
    setActiveSun(!status);
  }, [theme]);

  return (
    <nav className={`d-flex navbar`}>
      <span className="d-flex justify-content-center">
        <img src={logo} alt="" width="32px" height="32px" />
        <h1 className="navbar-brand ml-2">{title}</h1>
      </span>

      <div className="d-flex align-items-center">
        <Icon classNames="fa fa-sun-o medium-icon" active={activeSun}></Icon>
        <ToggleSwitch theme={theme} doSetTheme={doSetTheme} />
        <Icon classNames="fa fa-moon-o medium-icon" active={activeMoon}></Icon>
      </div>
    </nav>
  );
};

export default NavBar;
