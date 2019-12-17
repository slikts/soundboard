import { combineReducers } from "@reduxjs/toolkit";

import playlist from "../features/playlist/playlistSlice";
import keybinds from "../features/keybinds/keybindSlice";

const rootReducer = combineReducers({
  playlist,
  keybinds
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
