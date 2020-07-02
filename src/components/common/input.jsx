import React from "react";

function Input({ name, label, onChange, onFocus, value, error }) {
  let classes = "form-control input-sm";
  classes += error ? " is-invalid" : "";
  return (
    <div>
      {label && (
        <label htmlFor={name} className="mt-2">
          {label}
        </label>
      )}
      <input
        className={classes}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {error && <p className="text-danger errorMessage">{error}</p>}
    </div>
  );
}

export default Input;
