import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "keybinds",
  initialState: [] as ReturnType<typeof Play>[],
  reducers: {
    play(state, { payload }) {
      state.push(Play(payload));
    },
    stop(state, { payload: { id } }) {
      const i = state.findIndex(x => x.id === id);
      if (i > -1) {
        state.splice(i, 1);
      }
    }
  }
});

let playId = 0;
const Play = ({ filePath }: { filePath: string }) => ({
  id: playId++,
  filePath
});

export const { play, stop } = playlistSlice.actions;

export default playlistSlice.reducer;
