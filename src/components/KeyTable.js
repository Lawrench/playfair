import React, { Component } from "react";

export class KeyTable extends Component {
  constructor(props) {
    super(props);
    this.baseIdName = "keyTable-";
  }

  render() {
    const rows = this.props.sort(this.props.cipherKey);
    return (
      <div>
        <table id="key-table" className="block">
          <tbody>
          {this.props.buildTable(rows)}
          </tbody>
        </table>
      </div>
    );
  }
}
