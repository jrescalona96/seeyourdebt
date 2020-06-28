import React from "react";
import { getCurrencyFormatter } from "../utils/formatter";

function TotalDebt({ total, balance, currentLocale }) {
  const scaleFactor = 20;
  const textHeight = balance > 0 ? scaleFactor / (total / balance) : 8;

  function getColor() {
    if (textHeight <= scaleFactor / 4) return "green";
    else if (textHeight <= scaleFactor / 3) return "blue";
    else if (textHeight <= scaleFactor / 2) return "orange";
    else return "red";
  }

  const formatter = getCurrencyFormatter(currentLocale);
  const style = {
    fontSize: `${textHeight}vw`,
    color: getColor(),
    fontWeight: "bold",
    position: "absolute",
    bottom: "2vh",
    overflow: "auto",
    overflowY: "hidden",
  };
  return (
    <div style={style}>
      {balance > 0 ? formatter.format(balance) : "You're Debt Free!"}
    </div>
  );
}

export default TotalDebt;
