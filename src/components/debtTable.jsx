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

  renderPayForm = (item) => {
    const { theme, onPay } = this.props;
    return <PayForm item={item} onPay={(data) => onPay(data)} theme={theme} />;
  };

  renderDeleteButton = (item) => {
    const decoration = {
      classes: "btn btn-outline-danger btn-sm",
      label: "X",
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
    else if (totalCount === 1) message = `${totalCount} Debt left`;
    else message = "All Paid Up!";

    return { balance, total, totalCount, message };
  };

  render() {
    const {
      data: { debts },
      onSort,
      sortColumn,
      theme,
    } = this.props;

    const { balance, total, message } = this.mapToModelView();
    return (
      debts.length > 0 && (
        <div id="debtTable" className="col-12">
          <h4>{message}</h4>
          <h6>
            {balance} of {total}
          </h6>
          <Table
            columns={this.columns}
            onSort={(col) => onSort(col)}
            sortColumn={sortColumn}
            data={debts}
            theme={theme}
          />
        </div>
      )
    );
  }
}

export default DebtTable;
