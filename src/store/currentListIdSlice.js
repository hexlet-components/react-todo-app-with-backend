import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentListId',
  initialState: null,
  reducers: {
    setCurrentListId: (state, action) => action.payload,
  },
});

export const { setCurrentListId } = slice.actions;

export const selectCurrentListId = (state) => state.currentListId;

export default slice.reducer;
