import * as date from "./dateService";

let debts = [];
let debtsHistory = [];

export function getDebts() {
  return debts;
}

export function getDebt(_id) {
  return debts.find((item) => item._id === _id);
}

export function payDebt({ _id, amount }) {
  let paid = [];
  let remaining = [];

  debts.forEach((item) => {
    if (item._id === _id) item.balance -= parseFloat(amount);
    if (item.balance) remaining.push(item);
    else {
      item.date = date.getDateToday();
      paid.push(item);
    } // move this somewhere else
  });

  debts = remaining;
  debtsHistory = paid;

  return { debts, debtsHistory };
}

export function addDebt({ balance, lender }) {
  const _id = (debts.length + 1).toString();
  const amount = parseFloat(balance);
  const data = {
    _id: _id,
    date: date.getDateToday(),
    total: amount,
    balance: amount,
    lender: lender,
  };

  debts.push(data);
  return debts;
}

export function updateData(data) {
  debts = data;
}

export default { getDebts, getDebt, payDebt, updateData };
