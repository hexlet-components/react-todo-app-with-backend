/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-check

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { BsX } from 'react-icons/bs';

import {
  setCurrentListId,
  selectCurrentListId,
} from '../../store/currentListIdSlice.js';
import { listsActions } from './listsSlice.js';
import routes from '../../api/routes.js';

const defaultListId = 1; // TODO move to config or context or whatever
const listStates = {
  idle: 'idle',
  loading: 'loading',
};

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(listStates.idle);

  const currentListId = useSelector(selectCurrentListId);

  const buttonRef = useRef();

  const setCurrent = (e) => {
    e.preventDefault();
    dispatch(setCurrentListId(list.id));
  };

  const remove = async () => {
    try {
      setState(listStates.loading);
      const url = routes.list(list.id);
      await axios.delete(url);
      setState(listStates.idle);
      dispatch(listsActions.remove(list.id));
      dispatch(setCurrentListId(defaultListId));
    } catch (err) {
      setState(listStates.idle);
      buttonRef.current?.focus();
      toast('Network error');
    }
  };

  const currentClass = cn(
    currentListId === list.id ? 'link-primary' : 'link-secondary',
    'btn',
    'btn-link'
  );

  return (
    <div className="d-flex justify-content-between align-items-start">
      <button onClick={setCurrent} className={currentClass} type="button">
        {list.name}
      </button>
      {list.removable && (
        <button
          onClick={remove}
          className="btn link-danger"
          disabled={state === listStates.loading}
          ref={buttonRef}
          type="button"
        >
          <BsX />
          <span className="visually-hidden">remove list</span>
        </button>
      )}
    </div>
  );
};

export default List;
