import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";

class PayForm extends Form {
  state = {
    data: { _id: "", balance: 0, amount: 0 },
    errors: {},
  };

  schema = {
    _id: Joi.string().required(),
    balance: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required().label("Amount"),
    isPaid: Joi.boolean().required(),
  };

  componentDidMount() {
    const data = this.mapToState();
    this.setState({ data });
  }

  mapToState() {
    const { _id, balance, isPaid } = this.props.item;
    const data = { ...this.state.data };
    data._id = _id;
    data.balance = balance;
    data.isPaid = isPaid;
    return data;
  }

  doSubmit() {
    this.props.onPay(this.state.data);
  }

  render() {
    return (
      <React.Fragment>
        <form className="row " onSubmit={this.handleSubmit}>
          <div>{this.renderInput("amount")}</div>
          <div>{this.renderSubmitButton("Pay", this.props.item.isPaid)}</div>
        </form>
      </React.Fragment>
    );
  }
}

export default PayForm;
