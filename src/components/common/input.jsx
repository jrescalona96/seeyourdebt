import React from "react";

function Input({ name, label, onChange, value }) {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={(e) => (e.currentTarget.value = "")}
      />
    </div>
  );
}

export default Input;
