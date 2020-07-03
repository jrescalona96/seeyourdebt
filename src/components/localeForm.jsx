import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";

class LocaleForm extends Form {
  state = {
    data: { locale: "" },
    errors: {},
  };

  schema = {
    locale: Joi.string().required().not("").label("Loacale"),
  };

  doSubmit() {
    const localeId = this.state.data.locale;
    this.props.onLocaleChange(localeId);
  }

  render() {
    const { locales } = this.props;

    return (
      <form
        id="localeForm"
        className="pb-2 col-12 col-sm-6"
        onSubmit={this.handleSubmit}
      >
        <h4>Change Locale</h4>
        {this.renderMenu({
          name: "locale",
          label: "",
          items: locales,
        })}
        {this.renderSubmitButton("Apply")}
      </form>
    );
  }
}

export default LocaleForm;
