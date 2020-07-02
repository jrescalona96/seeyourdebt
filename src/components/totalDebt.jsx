import React from "react";
import { Spring } from "react-spring/renderprops";

function TotalDebt({ total, previousBalance, balance, currencyFormatter }) {
  const percentage = (balance / total) * 100;
  const textHeight = "12rem";

  function getColor() {
    if (percentage <= 10) return "#0390fc";
    else if (percentage <= 20) return "#03d7fc";
    else if (percentage <= 30) return "#0331fc";
    else if (percentage <= 40) return "#03d7fc";
    else if (percentage <= 50) return "#73fc03";
    else if (percentage <= 60) return "#fcf403";
    else if (percentage <= 70) return "#fcbe03";
    else if (percentage <= 80) return "#fc6b03";
    else if (percentage > 80) return "#fc0303";
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
        from={{ number: previousBalance }}
        to={{ number: balance }}
      >
        {(props) => (
          <div id="totalDebt" className="text-center" style={style}>
            {currencyFormatter.format(props.number.toFixed())}
          </div>
        )}
      </Spring>
    </React.Fragment>
  );
}

export default TotalDebt;
