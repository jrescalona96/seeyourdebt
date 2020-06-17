import React from "react";

function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th className="p-0" key={col.path || col.key}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
