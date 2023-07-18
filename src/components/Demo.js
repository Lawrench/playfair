import React, { Component } from "react";
import { Cipher }           from "./Cipher";
import { KeyTable }         from "./KeyTable";
import { KeyInput }         from "./KeyInput";
import { MsgInput }         from "./MsgInput";
import {
  findCoordinates,
  handleRepeatingAndSingleLetters,
  handleLettersOnSameRow,
  handleLettersOnSameColumn, handleLettersNotOnSameRowOrColumn
} from '../utils/cipherUtils';

/**
 * contains the demo components
 */
export class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      cipherKey: '',
      cipher: '',
      tableData: [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'k'],
        ['l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u'],
        ['v', 'w', 'x', 'y', 'z'],
      ]
    };
    this.buildTable = this.buildTable.bind(this);
  }

  /**
   * Lifecycle method called after the component updates.
   *
   * @param {Object} prevProps previous props object.
   * @param {Object} prevState previous state object.
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.message !== prevState.message || this.state.cipherKey !== prevState.cipherKey) {
      this.updateCipher();
    }
  }

  /**
   * Start building the table
   * @param {[]} rows
   * @returns {*[]}
   */
  buildTable = (rows) => {
    return [...Array(5)].map((e, y) =>
      <tr className="keyTable-row" key={y} id={this.baseIdName + 'Y' + y}>
        {this.buildCells(y, rows[y])}
      </tr>);
  };

  /**
   * Given a row of data, create the table cells
   *
   * @param {Number} rowPos
   * @param {[]} cellData
   * @returns {[]} One row of cells for the table
   */
  buildCells = (rowPos, cellData) => {
    let cells = [];
    for (let x = 0; x < 5; x++) {
      let cellValue = cellData[x];
      if (cellValue === 'i') {
        cellValue = 'i/j';
      }
      cells.push(
        <td
          id={this.baseIdName + '-' + cellValue}
          key={rowPos + '-' + x}
          contains={cellValue}
          x={x}
          y={rowPos}
        >
          {cellValue}
        </td>
      );
    }
    return cells;
  };


  /**
   * Sorts the alphabet into nested 5x5 array with the
   * cipher key {key} first.
   *
   * Rules: strip duplicates, do not repeat any letter, combine i/j into
   * a single character
   *
   * @param {String} key
   * @returns {[]} nested array of 5 x 5 matching table coordinates
   */
  sortTable = (key) => {
    key = !key ? '' : key.toLowerCase().replace(/[^a-z]+/g, '').split('').filter((item, pos, self) => self.indexOf(item) === pos).join('');
    const alphabet = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ];
    let keyPos = 0;
    let alphaPos = 0;
    let rows = [];
    for (let y = 0; y < 5; y++) {
      let col = [];
      for (let x = 0; x < 5; x++) {
        if (keyPos < key.length) {
          const letter = key.charAt(keyPos);
          col.push(letter);
          keyPos++;
        } else {
          // Skip past any characters found in the key
          while (key.includes(alphabet[alphaPos]) === true) {
            alphaPos++;
          }
          col.push(alphabet[alphaPos]);
          alphaPos++;
        }
      }
      rows.push(col);
    }
    return rows;
  };

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleStateChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      if (name === 'cipherKey') {
        const rows = this.sortTable(value);
        this.setState({ tableData: rows }, () => {
          this.updateCipher(); // Trigger cipher update after both key and tableData have been updated
        });
      } else if (name === 'message') {
        this.updateCipher(); // Trigger cipher update after message has been updated
      }
    });
  };


  /**
   * update the cipher using the rules
   */
  updateCipher = () => {
    const message = this.state.message.toLowerCase().replace(/[^a-z]+/g, '').replace(/[j]+/g, 'i');
    let cipher = [];
    for (let i = 0; i < message.length; i += 2) {
      let digram = message.substring(i, i + 2);
      digram = handleRepeatingAndSingleLetters(digram);
      const data = this.state.tableData;

      let { x: x1, y: y1 } = findCoordinates(digram[0], data);
      let { x: x2, y: y2 } = findCoordinates(digram[1], data);

      if (y1 === y2) {
        ({ x1, y1, x2, y2, digram } = handleLettersOnSameRow(digram, data, x1, y1, x2, y2));
      } else if (x1 === x2) {
        ({ x1, y1, x2, y2, digram } = handleLettersOnSameColumn(digram, data, x1, y1, x2, y2));
      } else {
        ({ x1, y1, x2, y2, digram } = handleLettersNotOnSameRowOrColumn(digram, data, x1, y1, x2, y2));
      }
      cipher.push(`${data[y1][x1]}${data[y2][x2]}`);
    }

    this.setState({ cipher: cipher.join(' ').toUpperCase() });
  };

  render() {
    return (
      <div id='demo' className="inline-block float-left">
        <form className="inline-block text-align-right">
          <MsgInput
            value={this.state.message}
            onChange={this.onChange}
            handleStateChange={this.handleStateChange}
          />
          <KeyInput
            value={this.state.cipherKey}
            onChange={this.onChange}
            handleStateChange={this.handleStateChange}
          />
        </form>
        <KeyTable
          tableData={this.state.tableData}
          cipherKey={this.state.cipherKey}
          buildTable={this.buildTable}
          sort={this.sortTable}
        />
        <Cipher message={this.state.cipher} />
      </div>
    );
  }
}
