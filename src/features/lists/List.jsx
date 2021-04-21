// @ts-nocheck

import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { listsActions } from './listsSlice.js';
import routes from '../../api/routes.js';

const listStates = {
  idle: 'idle',
  loading: 'loading',
};

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(listStates.idle);

  const buttonRef = useRef();

  const remove = async () => {
    try {
      setState(listStates.loading);
      const url = routes.list(list.id);
      await axios.delete(url);
      setState(listStates.idle);
      dispatch(listsActions.remove(list.id));
    } catch (err) {
      setState(listStates.idle);
      buttonRef.current?.focus();
      console.log(err);
    }
  };

  return (
    <div className="row align-items-center justify-content-between">
      <div className="col-8">{list.name}</div>
      <div className="col-4 d-flex justify-content-end">
        <button
          onClick={remove}
          className="btn btn-sm btn-danger"
          type="button"
          disabled={state === listStates.loading}
          ref={buttonRef}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default List;
