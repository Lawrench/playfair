import React, { useState, useEffect } from "react";
import Cipher from "./Cipher";
import KeyTable from "./KeyTable";
import KeyInput from "./KeyInput";
import MsgInput from "./MsgInput";
import {
  findCoordinates,
  handleRepeatingAndSingleLetters,
  handleLettersOnSameRow,
  handleLettersOnSameColumn,
  handleLettersNotOnSameRowOrColumn,
} from '../utils/cipherUtils';

const Demo = () => {
  const [message, setMessage] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipher, setCipher] = useState('');
  const [tableData, setTableData] = useState([
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h', 'i', 'k'],
    ['l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u'],
    ['v', 'w', 'x', 'y', 'z'],
  ]);

  const updateCipher = () => {
    const processedMessage = message.toLowerCase().replace(/[^a-z]+/g, '').replace(/[j]+/g, 'i');
    let newCipher = [];
    for (let i = 0; i < processedMessage.length; i += 2) {
      let digram = processedMessage.substring(i, i + 2);
      digram = handleRepeatingAndSingleLetters(digram);

      let { x: x1, y: y1 } = findCoordinates(digram[0], tableData);
      let { x: x2, y: y2 } = findCoordinates(digram[1], tableData);

      if (y1 === y2) {
        ({ x1, y1, x2, y2, digram } = handleLettersOnSameRow(digram, tableData, x1, y1, x2, y2));
      } else if (x1 === x2) {
        ({ x1, y1, x2, y2, digram } = handleLettersOnSameColumn(digram, tableData, x1, y1, x2, y2));
      } else {
        ({ x1, y1, x2, y2, digram } = handleLettersNotOnSameRowOrColumn(digram, tableData, x1, y1, x2, y2));
      }
      newCipher.push(`${tableData[y1][x1]}${tableData[y2][x2]}`);
    }

    setCipher(newCipher.join(' ').toUpperCase());
  };

  useEffect(() => {
    updateCipher();
  });

  const handleStateChange = (name, value) => {
    if (name === 'cipherKey') {
      setCipherKey(value);
      const rows = sortTable(value);
      setTableData(rows);
      updateCipher();
    } else if (name === 'message') {
      setMessage(value);
      updateCipher();
    }
  };

  const buildTable = (rows) => {
    return [...Array(5)].map((e, y) =>
      <tr className="keyTable-row" key={y}>
        {buildCells(y, rows[y])}
      </tr>);
  };

  const buildCells = (rowPos, cellData) => {
    let cells = [];
    for (let x = 0; x < 5; x++) {
      let cellValue = cellData[x];
      if (cellValue === 'i') {
        cellValue = 'i/j';
      }
      cells.push(
        <td
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

  const sortTable = (key) => {
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

  return (
    <div id='demo' className="inline-block float-left">
      <form className="inline-block text-align-right">
        <MsgInput
          value={message}
          onChange={setMessage}
          handleStateChange={handleStateChange}
        />
        <KeyInput
          value={cipherKey}
          onChange={setCipherKey}
          handleStateChange={handleStateChange}
        />
      </form>
      <KeyTable
        tableData={tableData}
        cipherKey={cipherKey}
        buildTable={buildTable}
        sort={sortTable}
      />
      <Cipher message={cipher} />
    </div>
  );
};

export default Demo;
