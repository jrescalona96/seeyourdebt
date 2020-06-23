import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";

class CurrencyForm extends Form {
  state = {
    data: { locale: "" },
    errors: {},
  };

  schema = {
    locale: Joi.string().required(),
  };

  doSubmit() {
    const localeId = this.state.data.locale;
    this.props.onLocaleChange(localeId);
  }

  render() {
    const { locales } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Change Locale</h3>
        {this.renderMenu({
          name: "locale",
          label: "Locale",
          items: locales,
        })}
        {this.renderSubmitButton("Apply")}
      </form>
    );
  }
}

export default CurrencyForm;
