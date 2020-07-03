import React, { useState } from "react";
import ToggleSwitch from "./common/toggleSwitch";
import Icon from "./common/icon";
import { useEffect } from "react";

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
      <h1 className="navbar-brand">{title}</h1>
      <div className="d-flex align-items-center">
        <Icon classNames="fa fa-sun-o medium-icon" active={activeSun}></Icon>
        <ToggleSwitch theme={theme} doSetTheme={doSetTheme} />
        <Icon classNames="fa fa-moon-o medium-icon" active={activeMoon}></Icon>
      </div>
    </nav>
  );
};

export default NavBar;
