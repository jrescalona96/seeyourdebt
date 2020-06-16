import React from "react";
import _ from "lodash";

function createKey(item, col) {
  return item._id + (col.path || col.key);
}

function renderCell(item, col) {
  if (col.content) return col.content(item);
  else return _.get(item, col.path);
}

function Table({ columns, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.path || col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((col) => (
              <td key={createKey(item, col)}>{renderCell(item, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
