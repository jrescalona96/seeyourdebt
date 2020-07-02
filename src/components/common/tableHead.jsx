import React, { Component } from "react";

class TableHead extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (!path || !this.props.sortColumn) {
      return;
    } else if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (col) => {
    const { sortColumn } = this.props;

    if (sortColumn) {
      if (col.path !== sortColumn.path || col.key) return null;
      else if (sortColumn.order === "asc")
        return <i className="ml-1 fa fa-arrow-up" aria-hidden="true"></i>;
      return <i className="ml-1 fa fa-arrow-down" aria-hidden="true"></i>;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((col) => (
            <th
              onClick={() => {
                this.raiseSort(col.path);
              }}
              className={col.path ? "clickable" : ""}
              key={col.path || col.key}
            >
              {col.label}
              {this.renderSortIcon(col)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
