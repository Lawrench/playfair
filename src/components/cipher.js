import React, { Component } from "react";

export class Cipher extends Component {
  render() {
    return (
      <div id="cipher">{this.props.message}</div>
    );
  }
}