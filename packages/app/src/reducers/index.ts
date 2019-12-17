import { combineReducers } from "redux";

import playlist from "features/playlist/playlistSlice";
import keybinds from "features/keybinds/keybindSlice";

export default combineReducers({
  playlist,
  keybinds
});
