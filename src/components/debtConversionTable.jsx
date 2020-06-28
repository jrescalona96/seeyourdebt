import React, { useState, useEffect } from "react";
import Table from "./common/table";
import { getForexRate } from "../services/currencyService";
import { getCurrencyFormatter } from "../utils/formatter";

const DebtConversionTable = ({ locales, total, currentLocale }) => {
  const [sortColumn, setSortColumn] = useState({
    path: "balance",
    order: "asc",
  });

  const [localeBalanceList, setLocaleBalanceList] = useState([]);

  const columns = [
    {
      path: "country",
      label: "Country",
    },
    { path: "balance", label: "Balance" },
  ];

  useEffect(() => {
    const data = locales.filter((loc) => loc.currency);
    formatData(data).then((value) => {
      setLocaleBalanceList(value);
    });
  });

  const formatData = (data) => {
    return Promise.all(
      data.map(async (item) => {
        const forex = await getForexRate(item.currency, currentLocale.currency);
        const currencyFormatter = getCurrencyFormatter(item);
        const balance = currencyFormatter.format(total * forex);
        const country = item.name;
        const _id = `${country}-${balance}`;
        return { _id, country, balance };
      })
    );
  };

  const handleChangeSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  return (
    <React.Fragment>
      <Table
        columns={columns}
        data={localeBalanceList}
        sortColumn={sortColumn}
        onSort={(sortColumn) => handleChangeSort(sortColumn)}
      ></Table>
    </React.Fragment>
  );
};

export default DebtConversionTable;
