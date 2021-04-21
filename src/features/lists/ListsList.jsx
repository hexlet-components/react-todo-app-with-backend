// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

import List from './List.jsx';
import { listsSelectors } from './listsSlice.js';

const ListsList = () => {
  const lists = useSelector(listsSelectors.selectAll);

  console.log(lists);

  return (
    <ul className="list-group">
      {lists.map((list) => (
        <li className="list-group-item container" key={list.id}>
          <List list={list} />
        </li>
      ))}
    </ul>
  );
};

export default ListsList;
