import React from "react";

function TotalDebt({ balance }) {
  const windowHeight = window.innerHeight;
  let textHeight = "50vw";
  // if (balance < windowHeight) textHeight = windowHeight / balance;
  // else textHeight = balance / windowHeight;

  const style = {
    color: "gray",
    fontSize: textHeight,
    fontWeight: "bold",
  };
  return (
    <div className="text-left overflow-hidden" style={style}>
      ${balance}
    </div>
  );
}

export default TotalDebt;
