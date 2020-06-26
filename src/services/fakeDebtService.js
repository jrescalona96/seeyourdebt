import * as date from "./dateService";
import * as crud from "./crudService";

let data = {
  debts: [],
  debtHistory: [],
};

export const initialize = (localData) => {
  data.debts = localData.debts;
  data.debtHistory = localData.debtHistory;
};

export const getDebts = () => {
  return data.debts;
};

export const getDebtHistory = () => {
  return data.debtHistory;
};

export const getDebt = (_id) => {
  return data.debts.find((item) => item._id === _id);
};

export const getBalance = () => {
  return data.debts.reduce((total, item) => total + item.balance, 0);
};

export const getTotal = () => {
  const balance = data.debts.reduce((total, item) => total + item.total, 0);
  return data.debtHistory.reduce((total, item) => total + item.total, balance);
};

export const payDebt = ({ _id, amount }) => {
  let debts = [];
  let debtHistory = [...data.debtHistory];
  data.debts.forEach((item) => {
    if (item._id === _id) item.balance -= parseFloat(amount);
    if (item.balance <= 0) debtHistory.push(item);
    else debts.push(item);
  });

  data.debts = debts;
  data.debtHistory = debtHistory;
  crud.setData("debts", data.debts);
  crud.setData("debtHistory", data.debtHistory);

  if (debts.length === 0) _resetDebt();
  return { debts, debtHistory };
};

export const addDebt = ({ balance, lender }) => {
  if (data.debts.length === 0) _resetDebtHistory();
  const _id = data.debts.length;
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

const _resetDebtHistory = () => {
  data.debtHistory = [];
  crud.setData("debtHistory", []);
};
const _resetDebt = () => {
  crud.setData("debtHistory", []);
};

export default { getDebts, getDebt, payDebt };
