import React from "react";

function TotalDebt({ balance }) {
  const style = { fontSize: "12vw", fontWeight: "bold" };
  return (
    <div className="text-center" style={style}>
      ${balance}
    </div>
  );
}

export default TotalDebt;
