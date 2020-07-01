import React from "react";
import { Spring } from "react-spring/renderprops";

function TotalDebt({ total, previousBalance, balance, currencyFormatter }) {
  const scaleFactor = total;
  const percentage = ((balance / total) * 100) / 2;
  const textHeight = balance > 0 ? percentage : 3;

  console.log(previousBalance, balance);

  function getColor() {
    if (percentage <= 10) return "green";
    else if (textHeight <= scaleFactor / 3) return "blue";
    else if (textHeight <= scaleFactor / 2) return "orange";
    else return "red";
  }

  const style = {
    fontSize: `${textHeight}vh`,
    color: getColor(),
    fontWeight: "bold",
  };

  return (
    <React.Fragment>
      <Spring
        config={{ tension: 10, friction: 15, delay: 10 }}
        from={{ number: previousBalance }}
        to={{ number: balance }}
      >
        {(props) => (
          <div style={style}>
            {currencyFormatter.format(props.number.toFixed())}
          </div>
        )}
      </Spring>
      {currencyFormatter.format(balance)}
    </React.Fragment>
  );
}

export default TotalDebt;
