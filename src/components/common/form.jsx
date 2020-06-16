import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };

  renderSubmitButton(label) {
    return (
      <button className="btn btn-outline-primary btn-sm mt-2">{label}</button>
    );
  }

  renderInput(name, label) {
    return (
      <Input
        label={label}
        name={name}
        onChange={this.handleChange}
        value={this.state.data[name]}
      />
    );
  }
}

export default Form;
