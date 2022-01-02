import { createSlice } from '@reduxjs/toolkit';

const orderssSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isFetching: false,
    error: false
  },
  reducers: {
    getOrdersStart: (state) => {
      state.isFetching = true;
    },
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload
    },
    getOrdersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const { getOrdersStart, getOrdersSuccess, getOrdersFailure } = orderssSlice.actions;
export default orderssSlice.reducer;