import React from "react";
import Form from "./common/form";

class AddForm extends Form {
  state = {
    data: { amount: 0, lender: "" },
    errors: {},
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    data.amount = parseFloat(data.amount);
    this.props.onAdd(data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          {this.renderInput("amount", "Amount")}
          {this.renderInput("lender", "Lender")}
          {this.renderSubmitButton("Add")}
        </div>
      </form>
    );
  }
}

export default AddForm;
