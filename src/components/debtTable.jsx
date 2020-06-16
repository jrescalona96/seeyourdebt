import React, { Component } from "react";
import Table from "./common/table";
import AddForm from "./addForm";
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
    const { data, onAdd } = this.props;
    return (
      <React.Fragment>
        <Table columns={this.columns} data={data} />
        <AddForm onAdd={(data) => onAdd(data)} />
      </React.Fragment>
    );
  }
}

export default DebtTable;

// DebtTable
//// Table
////// TableHeader
////// TableBody
