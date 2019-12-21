import eventToStream from "./eventToStream";
import EventEmitter from "events";
import { finished, collect } from ".";

describe("event to node stream", () => {
  it("converts events", async () => {
    const emitter = new EventEmitter();
    const type = "test";
    const stream = eventToStream(type, emitter);
    const val1 = 1;
    const val2 = 2;
    stream.resume();
    emitter.emit(type, val1);
    emitter.emit(type, val2);
    emitter.emit(type, null);
    expect(await collect(stream)).toEqual([val1, val2]);
  });

  it("closes on error", async () => {
    const emitter = new EventEmitter();
    const stream = eventToStream("foo", emitter, "error");
    emitter.emit("error", 123);
    try {
      await finished(stream);
    } catch (e) {}
  });
});
