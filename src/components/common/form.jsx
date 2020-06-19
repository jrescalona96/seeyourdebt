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

  validateProperty = ({ name, value }) => {
    const field = { [name]: value };
    const localSchema = Joi.object().keys({ [name]: this.schema[name] });
    const { error } = localSchema.validate(field);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const propertyErrorMessage = this.validateProperty(input);
    if (propertyErrorMessage) errors[input.name] = propertyErrorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    else this.doSubmit();
  };

  renderSubmitButton(label, isDisabled) {
    return (
      <button
        className="btn btn-outline-primary btn-sm m-2"
        disabled={isDisabled}
      >
        {label}
      </button>
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
