import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";
import * as debt from "../services/fakeDebtService";

class Dashboard extends Component {
  state = {
    debts: [],
  };

  componentDidMount() {
    const debts = debt.getDebts();
    this.setState({ debts });
  }

  handleAdd = ({ balance, lender }) => {
    const debts = [...this.state.debts];
    const _id = debts.length + 1;
    debts.push({ _id, balance: balance, lender: lender, isPaid: false });
    this.setState({ debts });
  };

  handlePay = (data) => {
    const debts = debt.payDebt(data);
    this.setState({ debts });
  };

  render() {
    const balance = debt.getTotalBalance();
    const total = debt.getTotal();

    return (
      <React.Fragment>
        <div className="row sticky-top container">
          <div className={"col-12 col-sm-6 m-2 p-2 card"}>
            <DebtTable
              className={"col-12 col-sm-6 m-2 p-2 card"}
              data={this.state.debts}
              onPay={(data) => this.handlePay(data)}
            />
          </div>
          <div className="col-12 col-sm-4 m-2 p-2 h-50 card">
            <AddForm
              className="col-12 col-sm-4 m-2 p-2 h-50 card"
              onAdd={(data) => this.handleAdd(data)}
            />
          </div>
        </div>
        <TotalDebt total={total} balance={balance} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
