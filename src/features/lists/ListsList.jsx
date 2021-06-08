// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

import List from './List.jsx';
import { listsSelectors } from './listsSlice.js';

const ListsList = () => {
  const lists = useSelector(listsSelectors.selectAll);

  return (
    <ul className="list-group list-group-flush" data-testid="lists">
      {lists.map((list) => (
        <li className="list-group-item" key={list.id}>
          <List list={list} />
        </li>
      ))}
    </ul>
  );
};

export default ListsList;
