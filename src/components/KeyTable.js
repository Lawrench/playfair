import React from "react";

const KeyTable = ({ cipherKey, sort, buildTable }) => {
  const rows = sort(cipherKey);
  return (
    <div>
      <table id="key-table" className="block">
        <tbody>
        {buildTable(rows)}
        </tbody>
      </table>
    </div>
  );
};

export default KeyTable;
