import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";
import * as debt from "../services/fakeDebtService";
import { getIntlFormatter } from "../utils/formatter";
import _ from "lodash";

class Dashboard extends Component {
  state = {
    debts: [],
    sortColumn: {},
  };

  componentDidMount() {
    const debts = debt.getDebts();
    const sortColumn = { path: "balance", order: "asc" };
    this.setState({ debts, sortColumn });
  }

  handleAdd = (data) => {
    const debts = debt.addDebt(data);
    this.setState({ debts });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePay = (data) => {
    const debts = debt.payDebt(data);
    this.setState({ debts });
  };

  mapToModelView = (data) => {
    const formatter = getIntlFormatter();
    return data.map((item) => ({
      _id: item._id,
      date: item.date,
      total: formatter.format(item.total),
      balance: formatter.format(item.balance),
      lender: item.lender,
      isPaid: item.isPaid,
    }));
  };

  getPageDate = () => {
    const { debts: data, sortColumn } = this.state;

    const ordered = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const debts = this.mapToModelView(ordered);
    const balance = data.reduce((total, item) => total + item.balance, 0);
    const total = data.reduce((total, item) => total + item.total, 0);

    return { balance, total, debts };
  };

  render() {
    const { debts, total, balance } = this.getPageDate();
    return (
      <React.Fragment>
        <div className="row sticky-top container-fluid">
          <div className={"col-12 col-md-8 m-2 p-2"}>
            <DebtTable
              data={{ balance, total, debts }}
              onPay={(data) => this.handlePay(data)}
              onSort={(col) => this.handleSort(col)}
              sortColumn={this.state.sortColumn}
            />
          </div>
          <div className="col-12 col-md-3 m-2 p-2">
            <AddForm onAdd={(data) => this.handleAdd(data)} />
          </div>
        </div>
        <TotalDebt total={total} balance={balance} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
