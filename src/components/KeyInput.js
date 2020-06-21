import React, { Component } from "react";

export class KeyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <label className="block">
        Cipher Key:&nbsp;
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </label>
    );
  }
}