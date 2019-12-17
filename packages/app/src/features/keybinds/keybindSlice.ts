import { createSlice } from "@reduxjs/toolkit";

const keybindSlice = createSlice({
  name: "keybinds",
  initialState: {
    "alt+a": "C:\\clips\\sqek.mp3"
  } as any,
  reducers: {
    bind(state, { payload: { key, path } }) {
      if (!state[key]) {
        state[key] = [];
      }
      state[key].push(path);
    },
    unbind(state, { payload: { key, path = null } }) {
      const i = state[key].lastIndexOf(path);
      if (i !== -1) {
        state[key].splice(i, 1);
      }
    },
    clear(state, { payload: { key } }) {
      state[key] = [];
    }
  }
});

export const { bind, unbind, clear } = keybindSlice.actions;

export default keybindSlice.reducer;
