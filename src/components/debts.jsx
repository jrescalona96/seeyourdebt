import React, { Component } from "react";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";
import CurrencyForm from "./currencyForm";
import * as locale from "../services/localeService";
import * as debt from "../services/fakeDebtService";
import * as currency from "../services/currencyService";
import { getCurrencyFormatter } from "../utils/formatter";
import _ from "lodash";

class Debts extends Component {
  state = {
    debts: [],
    debtHistory: [],
    sortColumn: {},
    currentLocale: {},
    locales: [],
  };

  componentDidMount() {
    const sortColumn = { path: "balance", order: "asc" };
    const currentLocale = locale.getDefaultLocale(); // pull from local storage
    const locales = locale.getLocales(); // pull from local storage

    let data = localStorage.getItem("data");
    if (!data) {
      data = {
        debts: [], //array of debts
        debtsHistory: [], //array of debts
        sortColumn: { path: "balance", order: "asc" },
        currentLocale: {
          _id: "ja-JP",
          languageCode: "ja-JP",
          name: "Japan",
          currency: "JPY",
        },
        locales: locales, //array available locales,
      };
      localStorage.setItem("data", JSON.stringify(data));
    }

    data = JSON.parse(localStorage.getItem("data"));

    const debts = debt.getDebts();
    const debtsHistory = debt.getDebtHistory();
    this.setState({ debts, debtsHistory, sortColumn, locales, currentLocale });
  }

  handleAdd = (data) => {
    const debts = debt.addDebt(data);
    this.setState({ debts });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePay = (data) => {
    debt.payDebt(data);
    const debts = debt.getDebts();
    const debtHistory = debt.getDebtHistory();
    this.setState({ debts, debtHistory });
  };

  handleLocaleChange = async (languageCode) => {
    if (languageCode !== this.state.currentLocale.languageCode) {
      const newLocale = locale.getLocale(languageCode);
      const forex = await currency.getForexRate(newLocale.currency);
      const debts = this.state.debts.map((item) => {
        item.balance = item.balance * forex;
        item.total = item.total * forex;
        return item;
      });

      this.setState({ currentLocale: newLocale, debts });
    }
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
    const { debts: remainingDebts, sortColumn, currentLocale } = this.state;
    // get formatter
    const formatter = getCurrencyFormatter(currentLocale);

    const orderedDebts = _.orderBy(
      remainingDebts,
      [sortColumn.path],
      [sortColumn.order]
    );

    // format data
    const debts = this.mapToModelView(orderedDebts, formatter);

    // get total balance
    const balance = debt.getBalance();

    // get original total debt
    const total = debt.getTotal();

    return { debts, balance, total };
  };

  render() {
    const { debts, total, balance } = this.getPageDate();
    const { locales, currentLocale } = this.state;

    return (
      <React.Fragment>
        <div className="row sticky-top">
          <div className="col-12 col-lg-6">
            <DebtTable
              data={{ debts, total, balance }}
              onPay={(data) => this.handlePay(data)}
              onSort={(col) => this.handleSort(col)}
              sortColumn={this.state.sortColumn}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <AddForm onAdd={(data) => this.handleAdd(data)} />
              </div>
              <div className="col-12 col-md-6">
                <CurrencyForm
                  locales={locales}
                  currentLocale={currentLocale}
                  onLocaleChange={this.handleLocaleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <TotalDebt
            total={total}
            balance={balance}
            currentLocale={currentLocale}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Debts;
