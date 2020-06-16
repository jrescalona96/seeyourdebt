import React from "react";

function TotalDebt({ total }) {
  const style = { fontSize: "10vw", fontWeight: "bold" };
  return (
    <div className="text-center" style={style}>
      ${total}
    </div>
  );
}

export default TotalDebt;
