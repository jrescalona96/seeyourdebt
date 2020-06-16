import React, { Component } from "react";
import Table from "./common/table";
import PayForm from "./payForm";

class DebtTable extends Component {
  columns = [
    { path: "balance", label: "Balance" },
    { path: "lender", label: "Lender" },
    {
      path: "payAmountForm",
      label: "Pay Amount",
      content: (item) => (
        <PayForm item={item} onPay={(amount) => this.props.onPay(amount)} />
      ),
    },
  ];

  render() {
    return (
      <React.Fragment>
        <Table columns={this.columns} data={this.props.data} />
      </React.Fragment>
    );
  }
}

export default DebtTable;
