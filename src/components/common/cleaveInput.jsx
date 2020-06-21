import React from "react";
import Cleave from "cleave.js/react";

function CleaveInput({ name, placeholder, options, value, error, onChange }) {
  return (
    <React.Fragment>
      <Cleave
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        options={options}
        value={value}
        error={error}
      ></Cleave>
      {error && <p className="text-danger">{error}</p>}
    </React.Fragment>
  );
}

export default CleaveInput;
