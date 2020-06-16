import React from "react";
import From from "./form";

class inlineForm extends Form {
  renderInput(inputName, onChange, value) {
    return <div>{renderButton}</div>;
  }
}

export default FormInline;
