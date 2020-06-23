import React from "react";
import { getCurrencyFormatter } from "../utils/formatter";
import * as locale from "../services/localeService";

function TotalDebt({ total, balance, currentLocale }) {
  const scaleFactor = 40;
  const textHeight = balance > 0 ? scaleFactor / (total / balance) : 8;

  function getColor() {
    if (textHeight <= scaleFactor / 4) return "green";
    else if (textHeight <= scaleFactor / 3) return "blue";
    else if (textHeight <= scaleFactor / 2) return "orange";
    else return "red";
  }

  const style = {
    fontSize: `${textHeight}vw`,
    color: getColor(),
    fontWeight: "bold",
  };

  let formatter = {};
  if (!currentLocale._id) {
    const defaultLocale = locale.getDefaultLocale();
    formatter = getCurrencyFormatter(defaultLocale);
  } else {
    formatter = getCurrencyFormatter(currentLocale);
  }

  return (
    <React.Fragment>
      <div className="text-left overflow-auto container-fluid" style={style}>
        {balance > 0 ? formatter.format(balance) : "You're Debt Free!"}
      </div>
    </React.Fragment>
  );
}

export default TotalDebt;
