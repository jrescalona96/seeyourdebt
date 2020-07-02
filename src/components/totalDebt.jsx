import React from "react";
import { Spring } from "react-spring/renderprops";

function TotalDebt({ total, previousBalance, balance, currencyFormatter }) {
  const percentage = (balance / total) * 100;
  const textHeight = "10rem";

  function getColor() {
    if (percentage <= 10) return "#0390fcaf";
    else if (percentage <= 20) return "#03d7fcaf";
    else if (percentage <= 30) return "#0331fcaf";
    else if (percentage <= 40) return "#03d7fcaf";
    else if (percentage <= 50) return "#73fc03af";
    else if (percentage <= 60) return "#fcf403af";
    else if (percentage <= 70) return "#fcbe03af";
    else if (percentage <= 80) return "#fc6b03af";
    else if (percentage > 80) return "#fc0303af";
    else return "gray";
  }

  const style = {
    fontSize: textHeight,
    color: getColor(),
    fontWeight: "bold",
  };

  return (
    <React.Fragment>
      <Spring
        config={{ tension: 25, friction: 10 }}
        from={{ number: previousBalance, number2: balance }}
        to={{ number: balance, number2: total - balance }}
      >
        {(props) => (
          <div id="totalDebt" style={style}>
            <div>Paid:{currencyFormatter.format(props.number2.toFixed())}</div>
            <div>Bal:{currencyFormatter.format(props.number.toFixed())}</div>
          </div>
        )}
      </Spring>
    </React.Fragment>
  );
}

export default TotalDebt;
