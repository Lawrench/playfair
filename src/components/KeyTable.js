import React, { Component } from "react";

export class KeyTable extends Component {
  constructor(props) {
    super(props);
    this.baseIdName = "keyTable-";
    this.state = {
      tableData: [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i/j', 'k'],
        ['l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u'],
        ['v', 'w', 'x', 'y', 'z'],
      ]
    };
  }

  buildTable = () => {
    return [...Array(5)]
    .map((e, y) => <tr className="key-table-row" key={y} id={this.baseIdName + 'Y' + y}>{this.buildCells(y)}</tr>);
  };

  buildCells = (row) => {
    let cells = [];
    let col = 0;
    while (col < 5) {
      cells.push(
        <td id={this.baseIdName + 'Y' + row + 'X' + col} key={row + '-' + col}>
          {this.state.tableData[row][col]}
        </td>
      );
      col++;
    }
    return cells;
  };

  render() {
    return (
      <table id="key-table" className="block">
        <tbody>
        {this.buildTable()}
        </tbody>
      </table>
    );
  }
}
