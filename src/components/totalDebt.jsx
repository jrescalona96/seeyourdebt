import React from "react";
import { getIntlFormatter } from "../utils/formatter";

function TotalDebt({ total, balance }) {
  const formatter = getIntlFormatter();

  let textHeight = 30 / (total / balance);

  const style = {
    color: "orange",
    fontSize: `${textHeight}vw`,
    fontWeight: "bold",
  };

  return (
    <React.Fragment>
      <div className="text-left overflow-hidden" style={style}>
        {formatter.format(balance)}
      </div>
    </React.Fragment>
  );
}

export default TotalDebt;
