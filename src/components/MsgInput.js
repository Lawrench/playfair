import React from "react";

const MsgInput = ({ value, onChange, handleStateChange }) => {
  const onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    onChange(fieldName, fieldValue);
    handleStateChange(fieldName, fieldValue);
  };

  return (
    <label className="block">
      Message:&nbsp;
      <input
        type="textarea"
        name="message"
        value={value}
        onChange={onFieldChange}
      />
    </label>
  );
};

export default MsgInput;
