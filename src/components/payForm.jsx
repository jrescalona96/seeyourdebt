import React from "react";
import Form from "./common/form";

class PayForm extends Form {
  state = {
    data: { _id: "", amount: 0 },
    errors: {},
  };

  componentDidMount() {
    const { _id } = this.props.item;
    const data = { ...this.state.data };
    data._id = _id;
    this.setState({ data });
  }

  doSubmit() {
    const { data } = this.state;
    this.props.onPay(data);
  }

  render() {
    return (
      <React.Fragment>
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="col-6"> {this.renderInput("amount")}</div>
          <div className="col-2"> {this.renderSubmitButton("Pay")}</div>
        </form>
      </React.Fragment>
    );
  }
}

export default PayForm;
