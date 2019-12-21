import createMockStore from "redux-mock-store";

import { play, stop } from "../features/playlist/playlistSlice";

import { getServiceMiddleware } from "./service";

const mockStore = createMockStore([
  getServiceMiddleware([], () => ({
    stdout: {
      on() {}
    },
    stderr: {
      on() {}
    },
    stdin: {
      setEncoding() {},
      write() {}
    }
  }))
]);

describe("foo", () => {
  xit("bla", () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(
      play({
        filePath: "sqek.mp3"
      })
    );
    store.dispatch(
      play({
        filePath: "sqek.mp3"
      })
    );
    const actions = store.getActions();
    console.log(actions);
  });
});
