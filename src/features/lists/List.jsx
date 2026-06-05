/* eslint-disable jsx-a11y/anchor-is-valid */
// @ts-check

import cn from 'classnames';
import { useRef } from 'react';
import { BsX } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import defaultListId from '../../config/index.js';
import { useRemoveListMutation } from '../../services/api.js';
import {
  selectCurrentListId,
  setCurrentListId,
} from '../../store/currentListIdSlice.js';

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [removeList, { isLoading }] = useRemoveListMutation();

  const currentListId = useSelector(selectCurrentListId);

  const buttonRef = useRef();

  const setCurrent = (e) => {
    e.preventDefault();
    dispatch(setCurrentListId(list.id));
  };

  const remove = async () => {
    try {
      await removeList(list.id);
      dispatch(setCurrentListId(defaultListId));
    } catch (_err) {
      buttonRef.current?.focus();
      toast('Network error');
    }
  };

  const currentClass = cn(
    currentListId === list.id ? 'link-primary' : 'link-secondary',
    'btn',
    'btn-link',
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
          disabled={isLoading}
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
