import * as date from "./dateService";

let debts = [
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
  {
    _id: "2",
    date: "01/03/2020",
    total: 22300,
    balance: 22300,
    lender: "Nelnet",
  },
  {
    _id: "3",
    date: "01/04/2020",
    total: 100,
    balance: 100,
    lender: "Apple",
  },
  {
    _id: "4",
    date: "06/17/2020",
    total: 750,
    balance: 750,
    lender: "USCIS",
  },
];

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
