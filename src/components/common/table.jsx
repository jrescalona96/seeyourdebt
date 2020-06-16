import React, { Component } from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { columns, data } = this.props;
    return (
      <table className="table">
        <TableHead columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
    );
  }
}

export default Table;
