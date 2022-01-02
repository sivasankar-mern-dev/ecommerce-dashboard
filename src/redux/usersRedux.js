import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isFetching: false,
    error: false
  },
  reducers: {
    getUsersStart: (state) => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const { getUsersStart, getUsersSuccess, getUsersFailure } = usersSlice.actions;
export default usersSlice.reducer;