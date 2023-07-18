import React from "react";

const KeyInput = ({ value, onChange, handleStateChange }) => {
  const onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    onChange(fieldName, fieldValue);
    handleStateChange(fieldName, fieldValue);
  };

  return (
    <label className="block">
      Cipher Key:&nbsp;
      <input
        type="text"
        name="cipherKey"
        value={value}
        onChange={onFieldChange}
      />
    </label>
  );
};

export default KeyInput;
