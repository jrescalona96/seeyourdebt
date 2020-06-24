import React, { Component } from "react";
import Table from "./common/table";
import PayForm from "./payForm";
import { getCurrencyFormatter } from "../utils/formatter";

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
    const { data, onSort, sortColumn, currentLocale } = this.props;

    const formatter = getCurrencyFormatter(currentLocale);
    const balance = formatter.format(data.balance);
    const total = formatter.format(data.balance);
    const totalCount = data.debts.reduce((total, item) => {
      if (!item.isPaid) total++;
      return total;
    }, 0);

    let message = "";
    if (totalCount > 1) message = `${totalCount} Debts Remaining `;
    else if (totalCount === 1) message = `${totalCount} Debt Left`;
    else message = "All Paid Up!";

    return (
      <React.Fragment>
        <h3>{message}</h3>
        <h6>
          {balance} of {total}
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
