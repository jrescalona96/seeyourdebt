import * as date from "./dateService";
import * as crud from "./crudService";
import { getDefaultLocale } from "./localeService";
import _ from "lodash";

export const getUserData = () => {
  let data = crud.getData();
  if (!data) {
    data = {
      debts: [],
      debtHistory: [],
      sortColumn: { path: "balance", order: "asc" },
      currentLocale: getDefaultLocale(),
    };
    crud.setData("data", data);
  }
  return data;
};

export const getDebts = () => {
  const data = { ...crud.getData() };
  return data.debts;
};

export const getDebtHistory = () => {
  const data = { ...crud.getData() };
  return data.debtHistory;
};

export const getDebt = (_id) => {
  const data = { ...crud.getData() };
  return data.debts.find((item) => item._id === _id);
};

export const payDebt = ({ _id, amount }) => {
  const data = { ...crud.getData() };
  let debts = [];
  let debtHistory = [...data.debtHistory];
  data.debts.forEach((item) => {
    if (item._id === _id) item.balance -= parseFloat(amount);
    if (item.balance <= 0) debtHistory.push(item);
    else debts.push(item);
  });
  crud.setData("debts", debts);
  crud.setData("debtHistory", debtHistory);
  if (debts.length === 0) _resetDebt();
  return { debts, debtHistory };
};

const _getNewId = (data) => {
  const maxItem = _.maxBy(data, "_id");
  let _id;
  if (!maxItem) _id = 0;
  else _id = maxItem._id + 1;
  return _id;
};

export const addDebt = ({ balance, lender }) => {
  const data = { ...crud.getData() };
  let _id = _getNewId([...data.debts, ...data.debtHistory]);
  if (data.debts.length === 0) _resetDebtHistory();
  const amount = parseFloat(balance);
  data.debts.push({
    _id: _id,
    date: date.getDateToday(),
    total: amount,
    balance: amount,
    lender: lender,
  });
  crud.setData("debts", data.debts);
  return data.debts;
};

export const deleteDebt = (_id) => {
  const data = { ...crud.getData() };
  const debts = data.debts.filter((item) => item._id !== _id);
  crud.setData("debts", debts);
  return debts;
};

export const setSortColumn = (setSortColumn) =>
  crud.setData("sortColumn", setSortColumn);
const _resetDebtHistory = () => crud.setData("debtHistory", []);
const _resetDebt = () => crud.setData("debts", []);

export const updateLocale = ({ locale, debts }) => {
  crud.setData("currentLocale", locale);
  crud.setData("debts", debts);
};

export default {
  getDebts,
  getDebt,
  payDebt,
  getUserData,
  setSortColumn,
  deleteDebt,
};
