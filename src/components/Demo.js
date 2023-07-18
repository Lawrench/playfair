import React, { Component } from "react";
import { Cipher }           from "./Cipher";
import { KeyTable }         from "./KeyTable";
import { KeyInput }         from "./KeyInput";
import { MsgInput }         from "./MsgInput";

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

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.rows) !== JSON.stringify(prevProps.rows)) {
      this.setState({ tableData: this.props.rows });
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
      cells.push(
        <td
          id={this.baseIdName + '-' + cellData[x]}
          key={rowPos + '-' + x}
          contains={cellData[x]}
          x={x}
          y={rowPos}
        >
          {cellData[x]}
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
  sort = (key) => {
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
    if (name === 'cipherKey') {
      const rows = this.sort(value);
      this.buildTable(rows);
    }
    if (this.state.message.length && this.state.cipherKey.length) {
      this.updateCipher();
    }
  };

  /**
   * update the cipher using the rules
   */
  updateCipher = () => {
    const message = this.state.message.toLowerCase().replace(/[^a-z]+/g, '').replace(/[j]+/g, 'i');
    let cipher = [];
    for (let i = 0; i < message.length; i += 2) {
      let digram = message.substring(i, i + 2);
      /** RULE 1 - If both letters are the same (or only one letter is left), add an "X" after the first letter.
       *  Encrypt the new pair and continue. Some variants of Playfair use "Q" instead of "X", but any letter, itself
       *  uncommon as a repeated pair, will do.*/
      if (digram.length === 1) {
        digram += "x";
      }

      if (digram[0] === digram[1]) {
        digram = `${digram[0]}x`;
      }

      /** get coordinates */
      const data = this.state.tableData;

      let x1, y1, x2, y2 = 0;
      data.forEach((row, yPos) => {
        row.forEach((val, xPos) => {
          if (val === digram[0]) {
            x1 = xPos;
            y1 = yPos;
          }
        })
      });

      data.forEach((row, yPos) => {
        row.forEach((val, xPos) => {
          if (val === digram[1]) {
            x2 = xPos;
            y2 = yPos;
          }
        })
      });

      /** RULE 2 - If the letters appear on the same row of your table, replace them with the letters to their
       *  immediate right respectively (wrapping around to the left side of the row if a letter in the original pair
       *  was on the right side of the row). */
      if (y1 === y2) {
        x1 = x1 === 4 ? x1 = 0 : x1 = x1 + 1;
        x2 = x2 === 4 ? x2 = 0 : x2 = x2 + 1;
        digram = `${data[y1][x1]} + ${data[y1][x2]}`;

      }

      /** RULE 3 - If the letters appear on the same column of your table, replace them with the letters
       *  immediately below respectively (wrapping around to the top side of the column if a letter in the original
       *  pair was on the bottom side of the column). */
      else if (x1 === x2) {
        y1 = y1 === 4 ? y1 = 0 : y1 = y1 + 1;
        y2 = y2 === 4 ? y2 = 0 : y2 = y2 + 1;
        digram = `${data[y1][x1]} + ${data[y1][x2]}`;
      }

      /** RULE 4 - If the letters are not on the same row or column, replace them with the letters
       *  on the same row respectively but at the other pair of corners of the rectangle defined by the original pair.
       * The order is important – the first letter of the encrypted pair is the one that lies on the same row as the
       * first letter of the plaintext pair. */
      else {
        x1 = 4 - x1;
        x2 = 4 - x2;
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
            onChange={this.onChange}
            handleStateChange={this.handleStateChange}
          />
          <KeyInput
            cipherKey={this.state.cipherKey}
            onChange={this.onChange}
            handleStateChange={this.handleStateChange}
          />
        </form>
        <KeyTable
          tableData={this.state.tableData}
          cipherKey={this.state.cipherKey}
          buildTable={this.buildTable}
          sort={this.sort}
        />
        <Cipher message={this.state.cipher} />
      </div>
    );
  }
}
