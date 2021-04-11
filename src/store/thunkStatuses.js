import { createSlice } from '@reduxjs/toolkit';
import { trimStart } from 'lodash';

const loadingTypesRegExp = /pending|fulfilled|rejected/;

const slice = createSlice({
  name: 'thunksStatuses',
  initialState: {},
  reducers: {},
  extraReducers: (builder) =>
    builder.addMatcher(
      (action) => loadingTypesRegExp.test(action.type),
      (state, action) => {
        const [match] = action.type.match(loadingTypesRegExp);
        const fetchingStatus = trimStart(match, '/');
        const actionTypePrefix = action.type.replace(loadingTypesRegExp, '');
        state[actionTypePrefix] = fetchingStatus;
      }
    ),
});

export default slice.reducer;
