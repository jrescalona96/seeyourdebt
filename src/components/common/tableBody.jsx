import React from "react";
import _ from "lodash";

function TableBody({ columns, data }) {
  const createKey = (item, col) => {
    return item._id + (col.path || col.key) + Date.now();
  };

  const renderCell = (item, col) => {
    if (col.content) return col.content(item);
    else return _.get(item, col.path);
  };

  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item._id}>
            {columns.map((col) => (
              <td key={createKey(item, col)}>{renderCell(item, col)}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
