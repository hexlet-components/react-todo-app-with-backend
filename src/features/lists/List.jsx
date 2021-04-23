/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-nocheck

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { BsX } from 'react-icons/bs';

import {
  setCurrentListId,
  selectCurrentListId,
} from '../../store/currentListIdSlice.js';
import { listsActions } from './listsSlice.js';

import routes from '../../api/routes.js';

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
    } catch (err) {
      setState(listStates.idle);
      buttonRef.current?.focus();
      console.log(err);
    }
  };

  const currentClass =
    currentListId === list.id ? 'link-primary' : 'link-secondary';

  return (
    <div className="d-flex justify-content-between align-items-start">
      <a href="" onClick={setCurrent} className={currentClass}>
        {list.name}
      </a>
      {list.removable === true && (
        <a
          href=""
          onClick={remove}
          className="link-danger"
          disabled={state === listStates.loading}
          ref={buttonRef}
        >
          <BsX />
        </a>
      )}
    </div>
  );
};

export default List;
