import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";
import CurrencyForm from "./currencyForm";
import * as locale from "../services/localeService";
import * as debt from "../services/fakeDebtService";
import { getCurrencyFormatter } from "../utils/formatter";
import _ from "lodash";

class Debts extends Component {
  state = {
    debts: [],
    sortColumn: {},
    currentLocale: {},
    locales: [],
  };

  componentDidMount() {
    const debts = debt.getDebts(); // pull from local storage
    const sortColumn = { path: "balance", order: "asc" };
    const currentLocale = locale.getDefaultLocale(); // pull from local storage
    const locales = locale.getLocales(); // pull from local storage
    this.setState({ debts, sortColumn, locales, currentLocale });
  }

  handleAdd = (data) => {
    const debts = debt.addDebt(data);
    this.setState({ debts });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePay = (data) => {
    const { debts } = debt.payDebt(data);
    this.setState({ debts });
  };

  handleLocaleChange = (localeCode) => {
    const currentLocale = locale.getLocale(localeCode);
    this.setState({ currentLocale });
  };

  mapToModelView = (data, formatter) => {
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
    // sort data
    const { debts: data, sortColumn, currentLocale } = this.state;
    // get formatter
    const formatter = getCurrencyFormatter(currentLocale);

    const orderedDebts = _.orderBy(data, [sortColumn.path], [sortColumn.order]);

    // format data
    const debts = this.mapToModelView(orderedDebts, formatter);

    // get total balance
    const balance = data.reduce((total, item) => total + item.balance, 0);

    // get original total debt
    const total = data.reduce((total, item) => total + item.total, 0);

    return { balance, total, debts };
  };

  render() {
    const { debts, total, balance } = this.getPageDate();
    const { locales, currentLocale } = this.state;

    return (
      <React.Fragment>
        <div className="row sticky-top">
          <div className={"col-12 col-md-5 m-2 p-2"}>
            <DebtTable
              data={{ balance, total, debts }}
              onPay={(data) => this.handlePay(data)}
              onSort={(col) => this.handleSort(col)}
              sortColumn={this.state.sortColumn}
            />
          </div>
          <div className="col-12 col-md-2 m-2 p-2">
            <AddForm onAdd={(data) => this.handleAdd(data)} />
          </div>
          <div className="col-12 col-md-2 m-2 p-2">
            <CurrencyForm
              locales={locales}
              currentLocale={currentLocale}
              onLocaleChange={this.handleLocaleChange}
            />
          </div>
        </div>
        <TotalDebt
          total={total}
          balance={balance}
          currentLocale={currentLocale}
        />
      </React.Fragment>
    );
  }
}

export default Debts;
