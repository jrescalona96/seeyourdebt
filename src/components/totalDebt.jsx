import React from "react";
import { Spring } from "react-spring/renderprops";

function TotalDebt({ total, previousBalance, balance, currencyFormatter }) {
  const getAlpha = (amount) => {
    const alpha = amount / total;
    if (!alpha || alpha < 0.05) return 0.05;
    return alpha;
  };

  return (
    <React.Fragment>
      <Spring
        config={{ tension: 25, friction: 10 }}
        from={{
          balance: previousBalance,
          paid: balance,
          balanceAlpha: getAlpha(previousBalance),
          paidAlpha: getAlpha(balance),
        }}
        to={{
          balance: balance,
          paid: total - balance,
          balanceAlpha: getAlpha(balance),
          paidAlpha: getAlpha(total - balance),
        }}
      >
        {(props) => (
          <div id="totalDebt">
            {props.paid > 0 && (
              <div style={{ color: `rgba(0,0,128,${props.paidAlpha})` }}>
                {currencyFormatter.format(props.paid)}
              </div>
            )}
            <div style={{ color: `rgba(139,0,0,${props.balanceAlpha})` }}>
              {currencyFormatter.format(props.balance)}
            </div>
          </div>
        )}
      </Spring>
    </React.Fragment>
  );
}

export default TotalDebt;
