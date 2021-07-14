import React from 'react';

const Spinner = () => {
  return (
    <div
      className="spinner-border ms-4 
            spinner-border-sm"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
