import React, { Component } from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { columns, data, onSort, sortColumn, theme } = this.props;
    return (
      <table className="table">
        <TableHead
          columns={columns}
          onSort={(col) => onSort(col)}
          sortColumn={sortColumn}
          theme={theme}
        />
        <TableBody columns={columns} data={data} theme={theme} />
      </table>
    );
  }
}

export default Table;
