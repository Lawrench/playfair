import React, { Component } from "react";


export class KeyInput extends Component {
  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }


  render() {
    return (
      <label className="block">
        Cipher Key:&nbsp;
        <input type="text"
               name={"cipherKey"}
               value={this.props.value}
               onChange={this.onFieldChange.bind(this)}
        />
      </label>
    );
  }
}