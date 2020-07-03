import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";

class PayForm extends Form {
  state = {
    data: { amount: "" },
    errors: {},
  };

  // must be declared before the schema
  lessThanEqualToBalance = (value, helpers) => {
    try {
      const bal = parseFloat(this.props.item.balance.replace(/[$,]/g, ""));
      const val = parseFloat(value);
      if (val > bal) return helpers.error();
    } catch (error) {
      throw new Error("Unable to parse balance.");
    }
  };

  schema = {
    amount: Joi.number()
      .greater(0)
      .required()
      .label("Amount")
      .custom(this.lessThanEqualToBalance, "amount must be <= balance")
      .message("Amount too much"),
  };

  doSubmit() {
    const { onPay, item } = this.props;
    const data = { _id: item._id, amount: this.state.data.amount };
    onPay(data);
  }

  render() {
    return (
      <form className="d-flex align-items-center" onSubmit={this.handleSubmit}>
        {this.renderInput("amount")}
        <div className="ml-2 ">{this.renderSubmitButton("Pay")}</div>
      </form>
    );
  }
}

export default PayForm;
