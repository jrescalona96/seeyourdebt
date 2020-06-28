import React from "react";

function ActionButton({ decoration, onClick }) {
  return (
    <button className={decoration.classes} onClick={onClick}>
      {decoration.label}
    </button>
  );
}

export default ActionButton;
