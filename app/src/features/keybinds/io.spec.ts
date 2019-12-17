import createMockStore from "redux-mock-store";

import { ioMiddleware } from "./io";

describe("foo", () => {
  it("bla", () => {
    const mockStore = createMockStore([
      ioMiddleware({
        io: {
          on() {},
          play() {},
          start() {}
        }
      })
    ]);
    const initialState = {};
    // const store = mockStore(initialState);
  });
});
