import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";

class Dashboard extends Component {
  state = {
    debts: [],
  };

  componentDidMount() {
    const debts = [
      { _id: "0", balance: 150, lender: "Chase Unlimited" },
      { _id: "1", balance: 500, lender: "Kinecta" },
      { _id: "2", balance: 22300, lender: "Nelnet" },
      { _id: "3", balance: 100, lender: "Apple Card" },
    ];
    this.setState({ debts });
  }

  getSum = (d) => {
    return d.reduce((sum, item) => {
      return sum + item.balance;
    }, 0);
  };

  handleAdd = ({ balance, lender }) => {
    const debts = [...this.state.debts];
    const _id = debts.length + 1;
    debts.push({ _id, balance: balance, lender: lender });
    this.setState({ debts });
  };

  handlePay = ({ amount, _id }) => {
    const debts = this.state.debts.reduce((data, item) => {
      if (item._id === _id) item.balance -= amount;
      if (item.balance > 0) data.push(item);
      return data;
    }, []);
    this.setState({ debts });
  };

  render() {
    const { debts } = this.state;
    const balance = this.getSum(debts);

    return (
      <React.Fragment>
        <div className="row sticky-top container">
          <div className="col-12 col-sm-6 m-2 p-2 card">
            <DebtTable data={debts} onPay={(data) => this.handlePay(data)} />
          </div>
          <div className="col-12 col-sm-4 m-2 p-2 h-50 card">
            <AddForm onAdd={(data) => this.handleAdd(data)} />
          </div>
        </div>
        <TotalDebt balance={balance} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
