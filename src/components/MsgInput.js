import React, { Component } from "react";

export class MsgInput extends Component {
  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
    this.props.handleStateChange(fieldName, fieldValue);
  }

  render() {
    return (
      <label className="block">
        Message:&nbsp;
        <input
          type="textarea"
          name={"message"}
          value={this.props.value}
          onChange={this.onFieldChange.bind(this)}
        />
      </label>
    );
  }
}