import React, { Component } from "react";
import Input from "./input";
import Joi from "@hapi/joi";

class Form extends Component {
  validate = () => {
    const localSchema = Joi.object().keys(this.schema);
    const options = { abortEarly: false };
    const { error } = localSchema.validate(this.state.data, options);

    if (error)
      return error.details.reduce((errors, err) => {
        errors[err.path[0]] = err.message;
        return errors;
      }, {});
    else return null;
  };

  parseInput = (input) => {
    const type = typeof this.state.data[input.name];
    if (type === "number") {
      if (!input.value) return 0;
      return parseFloat(input.value);
    } else return input.value;
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const parsedInput = this.parseInput(input);
    data[input.name] = parsedInput;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (!errors) this.doSubmit();
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
        error={this.state.errors[name]}
      />
    );
  }
}

export default Form;
