import { createEntityAdapter } from '@reduxjs/toolkit';

const adapter = createEntityAdapter({
  selectId: (list) => list.id,
  sortComparer: (a, b) => {
    if (a.completed === b.completed) {
      return b.touched - a.touched;
    }

    return a.completed ? 1 : -1;
  },
});

export default adapter;
