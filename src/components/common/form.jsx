import React, { Component } from "react";
import Input from "./input";
import Menu from "./menu";
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
    const propertyErrorMessage = this.validateProperty(input);

    let errors = { ...this.state.errors };
    if (propertyErrorMessage) errors[input.name] = propertyErrorMessage;
    else errors = {};

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

  handleFocus = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    delete errors[input.name];
    this.setState({ errors });
  };

  renderSubmitButton(label) {
    return (
      <button
        className="btn btn-primary btn-sm btn-block"
        disabled={this.validate()}
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
        onFocus={this.handleFocus}
        value={this.state.data[name]}
        error={this.state.errors[name]}
      />
    );
  }

  renderMenu({ name, label, items }) {
    return (
      <Menu
        items={items}
        name={name}
        label={label}
        error={this.state.errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
