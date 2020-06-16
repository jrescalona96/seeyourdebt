import React from "react";
import Form from "./common/form";

class AddForm extends Form {
  state = {
    data: { balance: 0, lender: "" },
    errors: {},
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    data.balance = parseInt(data.balance);
    console.log(data);
    this.props.onAdd(data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          {this.renderInput("balance", "Balance")}
          {this.renderInput("lender", "Lender")}
          {this.renderSubmitButton("Add")}
        </div>
      </form>
    );
  }
}

export default AddForm;
