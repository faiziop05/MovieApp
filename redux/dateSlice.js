import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lastVistedDate: '',
};

export const dateSlice = createSlice({
  name: 'lastDate',
  initialState,
  reducers: {
    setLastVisttedDate: (state, action) => {
      state.lastVistedDate = action.payload;
    },
  },
});

export const { setLastVisttedDate } = dateSlice.actions;

export default dateSlice.reducer;