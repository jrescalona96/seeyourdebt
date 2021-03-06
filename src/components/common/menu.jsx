import React from "react";

function Menu({ name, label, items, onChange, error }) {
  return (
    <React.Fragment>
      <div className="form-group ">
        <label htmlFor="currency">{label}</label>
        <select
          name={name}
          id={name}
          className="form-control"
          onChange={onChange}
        >
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </React.Fragment>
  );
}

export default Menu;
