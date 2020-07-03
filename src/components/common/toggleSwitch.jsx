import React from "react";

function ToggleSwitch({ doSetTheme }) {
  return (
    <div className="d-flex">
      <div className="custom-control custom-switch  ml-2">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customSwitches"
          onClick={doSetTheme}
        />
        <label
          className="custom-control-label"
          htmlFor="customSwitches"
        ></label>
      </div>
    </div>
  );
}

export default ToggleSwitch;
