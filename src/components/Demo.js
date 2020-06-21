import React, { Component } from "react";
import { DemoForm }         from "./DemoForm";
import { Cipher }           from "./Cipher";
import { KeyTable }         from "./KeyTable";

/**
 * contains the demo components
 */
export class Demo extends Component {
  render() {
    return (
      <div id='demo' className="inline-block float-left">
        <DemoForm />
        <Cipher />
        <KeyTable />
      </div>
    );
  }
}