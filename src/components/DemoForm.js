import React, { Component } from "react";
import { KeyInput }         from "./KeyInput";
import { MsgInput }         from "./MsgInput";

export class DemoForm extends Component {
  render() {
    return (
      <form className="inline-block text-align-right">
        <KeyInput />
        <MsgInput />
      </form>
    )
  }
}