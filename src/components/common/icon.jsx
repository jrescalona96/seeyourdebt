import React, { useState, useEffect } from "react";

const Icon = ({ classNames, active }) => {
  const [color, setColor] = useState("red");
  useEffect(() => {
    setColor(active ? "orange" : "");
  }, [active]);
  return (
    <i style={{ color: color }} className={classNames} aria-hidden="true"></i>
  );
};

export default Icon;
