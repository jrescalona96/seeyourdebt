import React, { Component } from "react";
import Table from "./common/table";
import PayForm from "./payForm";
import ActionButton from "./common/actionButton";
class DebtTable extends Component {
  columns = [
    { path: "balance", label: "Balance" },
    { path: "lender", label: "Lender" },
    {
      key: "payAmountForm",
      label: "Pay Amount",
      content: (item) => this.renderPayForm(item),
    },
    {
      key: "delete",
      content: (item) => this.renderDeleteButton(item),
    },
  ];

  renderPayForm = (item) => (
    <PayForm item={item} onPay={(data) => this.props.onPay(data)} />
  );

  renderDeleteButton = (item) => {
    const decoration = {
      classes: "btn btn-danger btn-sm",
      label: "Delete",
    };
    return (
      <ActionButton
        decoration={decoration}
        onClick={() => this.props.onDelete(item)}
      />
    );
  };

  mapToModelView = () => {
    const { data, currencyFormatter } = this.props;
    const balance = currencyFormatter.format(data.balance);
    const total = currencyFormatter.format(data.total);
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
        <h4>{message}</h4>
        <h6>
          {balance} of {total}
        </h6>
        <span className="overflow-auto">
          <Table
            columns={this.columns}
            onSort={(col) => onSort(col)}
            sortColumn={sortColumn}
            data={debts}
          />
        </span>
      </React.Fragment>
    );
  }
}

export default DebtTable;
