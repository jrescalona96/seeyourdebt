import React, { Component } from "react";
import Table from "./common/table";
import PayForm from "./payForm";

class DebtTable extends Component {
  columns = [
    { path: "balance", label: "Balance" },
    { path: "lender", label: "Lender" },
    {
      key: "payAmountForm",
      label: "Pay Amount",
      content: (item) => (
        <PayForm item={item} onPay={(data) => this.props.onPay(data)} />
      ),
    },
  ];

  render() {
    const { data, onSort, sortColumn } = this.props;

    return (
      <React.Fragment>
        <h3>{data.debts.length} Debts Total</h3>
        <h6>
          {data.balance} of {data.total} Paid
        </h6>
        <Table
          columns={this.columns}
          onSort={(col) => onSort(col)}
          sortColumn={sortColumn}
          data={data.debts}
        />
      </React.Fragment>
    );
  }
}

export default DebtTable;
