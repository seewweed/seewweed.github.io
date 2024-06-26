import React from 'react';
function CustomButton({ onClick, label }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default CustomButton;
