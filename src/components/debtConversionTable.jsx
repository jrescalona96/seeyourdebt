import React from "react";
import Table from "./common/table";
import { getCurrencyFormatter } from "../utils/formatter";

const DebtConversionTable = ({ data: totals, locales, balance, theme }) => {
  const filtered = totals.filter((item) => item._id !== "");
  const data = filtered.map((item) => {
    const locale = locales.find((loc) => loc._id === item._id);
    const formatter = getCurrencyFormatter(locale);
    const total = formatter.format(item.total);
    return { _id: item._id, total, country: item.country };
  });

  const columns = [
    { path: "country", label: "Country" },
    { path: "total", label: "Total" },
  ];

  return (
    balance > 0 && (
      <div id="debtConversionTable">
        <Table columns={columns} data={data} theme={theme}></Table>
      </div>
    )
  );
};

export default DebtConversionTable;
