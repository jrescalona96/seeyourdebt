let debts = [
  {
    _id: "0",
    date: "01/01/2020",
    total: 150,
    balance: 150,
    lender: "Chase Unlimited",
    isPaid: false,
  },
  {
    _id: "1",
    date: "01/02/2020",
    total: 500,
    balance: 500,
    lender: "Kinecta",
    isPaid: false,
  },
  {
    _id: "2",
    date: "01/03/2020",
    total: 22300,
    balance: 22300,
    lender: "Nelnet",
    isPaid: false,
  },
  {
    _id: "3",
    date: "01/04/2020",
    total: 100,
    balance: 100,
    lender: "Apple",
    isPaid: false,
  },
  {
    _id: "4",
    date: "06/17/2020",
    total: 750,
    balance: 750,
    lender: "USCIS",
    isPaid: false,
  },
];

export function getDebts() {
  return debts;
}

export function getDebt(_id) {
  return debts.find((item) => item._id === _id);
}

export function getTotal() {
  return debts.reduce((total, item) => total + item.total, 0);
}

export function getTotalBalance() {
  return debts.reduce((total, item) => total + item.balance, 0);
}

export function payDebt({ _id, amount }) {
  debts = debts.map((item) => {
    if (item._id === _id) {
      item.balance -= amount;
      if (item.balance <= 0) {
        item.balance = 0;
        item.isPaid = true;
      }
    }
    return item;
  });

  return debts;
}

export default { getDebts, getDebt, getTotal, payDebt, getTotalBalance };
