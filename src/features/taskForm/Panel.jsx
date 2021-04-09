// @ts-check

import React from 'react';

const Panel = ({ handleAddTask, handleUpdateText, text }) => {
  const isDisabled = text.trim() === '';

  return (
    <form onSubmit={handleAddTask} className="form mb-3">
      <div className="input-group input-group-lg">
        <input
          onChange={handleUpdateText}
          value={text}
          type="text"
          className="form-control"
          placeholder="Please type text..."
        />
        <button
          disabled={isDisabled}
          className="btn btn-lg btn-outline-success"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Panel;
