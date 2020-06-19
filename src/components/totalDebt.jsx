import React from "react";

function TotalDebt({ total, balance }) {
  // const windowHeight = window.innerHeight;
  let textHeight = "5vw";

  const style1 = {
    color: "orange",
    fontSize: textHeight,
    fontWeight: "bold",
  };
  const style2 = {
    color: "red",
    fontSize: textHeight,
    fontWeight: "bold",
  };

  return (
    <React.Fragment>
      <div className="text-left overflow-hidden" style={style2}>
        Total: ${total}
      </div>
      <div className="text-left overflow-hidden" style={style1}>
        Balance: ${balance}
      </div>
    </React.Fragment>
  );
}

export default TotalDebt;
