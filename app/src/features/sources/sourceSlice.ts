import { createSlice } from "@reduxjs/toolkit";

const sourceSlice = createSlice({
  name: "sources",
  initialState: {
    target: null,
    files: []
  } as any,
  reducers: {
    watch(state, { payload: { target } }) {
      state.target = target;
      state.files = [];
    },
    unwatch(state, { payload: { target } }) {
      state.target = null;
    }
  }
});

export const { watch, unwatch } = sourceSlice.actions;

export default sourceSlice.reducer;
