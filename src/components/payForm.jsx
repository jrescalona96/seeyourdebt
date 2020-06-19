import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";

class PayForm extends Form {
  state = {
    data: { amount: "" },
    errors: {},
  };

  // must be declared before the schema
  validateWithBalance = (value, helpers) => {
    const { item } = this.props;
    const val = parseFloat(value);
    if (val > item.balance) return helpers.error();
  };

  schema = {
    amount: Joi.number()
      .greater(0)
      .required()
      .label("Amount")
      .custom(this.validateWithBalance, "amount must be <= balance")
      .message("Amount too much"),
  };

  doSubmit() {
    const { onPay, item } = this.props;
    const data = { _id: item._id, amount: this.state.data.amount };
    onPay(data);
  }

  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <form className="row " onSubmit={this.handleSubmit}>
          <div>{this.renderInput("amount")}</div>
          <div>{this.renderSubmitButton("Pay", item.isPaid)}</div>
        </form>
      </React.Fragment>
    );
  }
}

export default PayForm;
