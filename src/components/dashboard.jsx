import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";

class Dashboard extends Component {
  state = {
    debts: [],
    total: 0,
  };

  componentDidMount() {
    const debts = [
      { _id: 0, balance: 150, lender: "Chase Unlimited" },
      { _id: 1, balance: 500, lender: "Kinecta" },
      { _id: 2, balance: 22300, lender: "Nelnet" },
      { _id: 3, balance: 300, lender: "Apple Card" },
    ];
    const total = this.getSum(debts);

    this.setState({ debts });
    this.setState({ total });
  }

  getSum = (d) => {
    return d.reduce((sum, item) => {
      return sum + item.balance;
    }, 0);
  };

  handleOnFocus = (e) => {
    e.currentTarget.value = "";
  };

  handleAdd = ({ balance, lender }) => {
    const debts = [...this.state.debts];
    const _id = debts.length + 1;
    debts.push({ _id, balance: balance, lender: lender });
    const total = this.getSum(debts);
    this.setState({ debts });
    this.setState({ total });
  };

  handlePay = ({ amount, _id }) => {
    const d = [...this.state.debts];
    const debts = d.map((item) => {
      if (item._id === _id) item.balance -= amount;
      return item;
    });
    const total = this.getSum(debts);
    this.setState({ debts });
    this.setState({ total });
  };

  render() {
    const { total, debts } = this.state;
    return (
      <div className="row">
        <div className="col-4">
          <DebtTable
            data={debts}
            onPay={(amount) => this.handlePay(amount)}
            onAdd={(data) => this.handleAdd(data)}
          />
        </div>
        <div className="col-8">
          <TotalDebt total={total} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
