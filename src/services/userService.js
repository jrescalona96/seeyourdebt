import * as crud from "./crudService";

export const initializeUser = () => {
  const data = {
    debts: [], //array of debts
    debtHistory: [], //array of debts
    sortColumn: { path: "balance", order: "asc" },
    currentLocale: {
      _id: "ja-JP",
      languageCode: "ja-JP",
      name: "Japan",
      currency: "JPY",
    },
    locales: [], //array available locales,
  };
  crud.setData("data", data);
  return data;
};

export default { initializeUser };
