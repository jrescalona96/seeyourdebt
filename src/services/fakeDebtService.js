import * as date from "./dateService";

let data = {
  debts: [
    {
      _id: "0",
      date: "01/01/2020",
      total: 150,
      balance: 150,
      lender: "Chase Unlimited",
    },
    {
      _id: "1",
      date: "01/02/2020",
      total: 500,
      balance: 500,
      lender: "Kinecta",
    },
  ],
  debtHistory: [],
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
  let debtHistory = [];
  data.debts.forEach((item) => {
    if (item._id === _id) item.balance -= parseFloat(amount);
    if (item.balance > 0) debts.push(item);
    else debtHistory.push(item);
  });
  data.debts = debts;
  data.debtHistory = debtHistory;
};

export const addDebt = ({ balance, lender }) => {
  const _id = data.debts.length;
  const amount = parseFloat(balance);
  data.debts.push({
    _id: _id,
    date: date.getDateToday(),
    total: amount,
    balance: amount,
    lender: lender,
  });

  return data.debts;
};

export default { getDebts, getDebt, payDebt };
