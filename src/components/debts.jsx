import React, { Component } from "react";
import _ from "lodash";
import TotalDebt from "./totalDebt";
import DebtTable from "./debtTable";
import AddForm from "./addForm";
import LocaleForm from "./localeForm";
import * as locale from "../services/localeService";
import * as api from "../services/api";
import * as currency from "../services/currencyService";
import * as crud from "../services/crudService";
import { getCurrencyFormatter } from "../utils/formatter";

class Debts extends Component {
  state = {
    debts: [],
    debtHistory: [],
    sortColumn: {},
    currentLocale: {},
    locales: [
      {
        _id: "",
        name: "Choose One",
      },
    ],
  };

  componentDidMount() {
    const data = api.getUserData();
    const debts = data.debts;
    const debtsHistory = data.debtHistory;
    const sortColumn = data.sortColumn;
    const currentLocale = data.currentLocale;
    const locales = [...this.state.locales, ...locale.getLocales()];

    this.setState({ debts, debtsHistory, sortColumn, locales, currentLocale });
  }

  handleAdd = (data) => {
    const debts = api.addDebt(data);
    this.setState({ debts });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePay = (data) => {
    const { debts, debtHistory } = api.payDebt(data);
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
      crud.setData("currentLocale", newLocale);
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

  getPageData = () => {
    const { debts: remainingDebts, sortColumn, currentLocale } = this.state;

    // get formatter
    const formatter = getCurrencyFormatter(currentLocale);

    // sort data
    const orderedDebts = _.orderBy(
      remainingDebts,
      [sortColumn.path],
      [sortColumn.order]
    );

    // format data
    const debts = this.mapToModelView(orderedDebts, formatter);

    // get total balance
    const balance = api.getBalance();

    // get original total debt
    const total = api.getTotal();

    return { debts, balance, total, formatter };
  };

  render() {
    const { debts, total, balance, formatter } = this.getPageData();
    const { locales, currentLocale } = this.state;

    return (
      <React.Fragment>
        <div className="row sticky-top">
          <div className="col-12 col-lg-6">
            <DebtTable
              data={{ debts, total, balance }}
              formatter={formatter}
              onPay={(data) => this.handlePay(data)}
              onSort={(col) => this.handleSort(col)}
              sortColumn={this.state.sortColumn}
            />

            <div className="row">
              <div className="col-12 col-md-6">
                <AddForm onAdd={(data) => this.handleAdd(data)} />
              </div>
              <div className="col-12 col-md-6">
                <LocaleForm
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
