import React, { Component } from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { columns, data, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHead
          columns={columns}
          onSort={(col) => onSort(col)}
          sortColumn={sortColumn}
        />
        <TableBody columns={columns} data={data} />
      </table>
    );
  }
}

export default Table;
