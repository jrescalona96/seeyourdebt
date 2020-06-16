import React from "react";

function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.path || col.key}>{col.label}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
