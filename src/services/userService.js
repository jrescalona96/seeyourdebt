import * as crud from "./crudService";
import { getDefaultLocale } from "./localeService";

export const initializeNewUser = () => {
  const data = {
    debts: [],
    debtHistory: [],
    sortColumn: { path: "balance", order: "asc" },
    currentLocale: getDefaultLocale(),
  };

  crud.setData("data", data);
  return data;
};

export default { initializeNewUser };
