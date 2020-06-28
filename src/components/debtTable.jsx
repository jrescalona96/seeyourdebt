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
    {
      key: "delete",
      content: (item) => <h1>Delete</h1>,
    },
  ];

  mapToModelView = () => {
    const { data, formatter } = this.props;
    const balance = formatter.format(data.balance);
    const total = formatter.format(data.total);
    const totalCount = data.debts.length;

    let message = "";
    if (totalCount > 1) message = `${totalCount} Debts Remaining `;
    else if (totalCount === 1) message = `${totalCount} Debt Left`;
    else message = "All Paid Up!";

    return { balance, total, totalCount, message };
  };

  render() {
    const {
      data: { debts },
      onSort,
      sortColumn,
    } = this.props;

    const { balance, total, message } = this.mapToModelView();
    return (
      <React.Fragment>
        <h3>{message}</h3>
        <h6>
          {balance} of {total}
        </h6>
        <div id="debtTable">
          <Table
            columns={this.columns}
            onSort={(col) => onSort(col)}
            sortColumn={sortColumn}
            data={debts}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DebtTable;
