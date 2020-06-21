import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";
import * as debt from "../services/fakeDebtService";
import { getIntlFormatter } from "../utils/formatter";

class Dashboard extends Component {
  state = {
    debts: [],
  };

  componentDidMount() {
    const debts = debt.getDebts();
    this.setState({ debts });
  }

  handleAdd = (data) => {
    const debts = debt.addDebt(data);
    this.setState({ debts });
  };

  handlePay = (data) => {
    const debts = debt.payDebt(data);
    this.setState({ debts });
  };

  mapToModelView = () => {
    const formatter = getIntlFormatter();
    return this.state.debts.map((item) => ({
      _id: item._id,
      date: item.date,
      total: formatter.format(item.total),
      balance: formatter.format(item.balance),
      lender: item.lender,
      isPaid: item.isPaid,
    }));
  };

  getBalance = () => {
    return this.state.debts.reduce((total, item) => total + item.balance, 0);
  };

  getTotal = () => {
    return this.state.debts.reduce((total, item) => total + item.total, 0);
  };

  render() {
    const balance = this.getBalance();
    const total = this.getTotal();
    const debts = this.mapToModelView();

    return (
      <React.Fragment>
        <div className="row sticky-top">
          <div className={"col-12 col-md-8 m-2 p-2"}>
            <DebtTable data={debts} onPay={(data) => this.handlePay(data)} />
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
