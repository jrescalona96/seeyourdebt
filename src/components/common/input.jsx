import React from "react";

function Input({ name, label, onChange, onFocus, value, error }) {
  let classes = "form-control";
  classes += error ? " is-invalid" : "";
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={classes}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default Input;
