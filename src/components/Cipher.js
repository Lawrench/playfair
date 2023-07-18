import React, { Component } from "react";

export class Cipher extends Component {
  render() {
    return (
      <div id="cipher">Cipher: {this.props.message}</div>
    );
  }
}
