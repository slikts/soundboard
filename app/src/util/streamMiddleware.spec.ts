import createMockStore from "redux-mock-store";
import { Readable } from "stream";
import streamMiddleware from "./streamMiddleware";
import { AppStream } from "../app/store";
import { finished } from "../util";

const mockStore = createMockStore([streamMiddleware]);

describe("stream middleware", () => {
  it("dispatches actions from stream", async () => {
    const initialState = {};
    const actions = [{ type: "foo" }, { type: "bla" }];
    const stream: AppStream = Readable.from(actions);
    const store = mockStore(initialState);
    store.dispatch(stream);
    await finished(stream);
    expect(store.getActions()).toEqual(actions);
  });
});
