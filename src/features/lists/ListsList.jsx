// @ts-check

import { toast } from 'react-toastify';
import Loader from '../../lib/Loader.jsx';
import { useGetListsQuery } from '../../services/api.js';
import List from './List.jsx';

const ListsList = () => {
  const { data: lists, error, isLoading } = useGetListsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast('Network error');
    return <span>Error while loading</span>;
  }

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
