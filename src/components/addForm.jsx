import React from "react";
import Form from "./common/form";
import Joi from "@hapi/joi";

class AddForm extends Form {
  state = {
    data: { balance: "", lender: "" },
    errors: {},
  };

  schema = {
    balance: Joi.number().greater(0).required().label(`Balance`),
    lender: Joi.string().required().label("Lender"),
  };

  doSubmit = () => {
    this.props.onAdd(this.state.data);
  };

  render() {
    return (
      <div id="addForm" className="col-12 col-sm-6">
        <h4>Add New Debt</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("balance", "Balance")}
            {this.renderInput("lender", "Lender")}
          </div>
          {this.renderSubmitButton("Add", this.state.errors)}
        </form>
      </div>
    );
  }
}

export default AddForm;
