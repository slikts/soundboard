import { Readable } from "stream";
import { finished, collect } from ".";

describe("util", () => {
  it("finished", async () => {
    const stream = Readable.from([1, 2, 3]);
    stream.resume();
    await finished(stream);
  });

  it("collect", async () => {
    const values = [1, 2, 3];
    const it = async function*() {
      yield* values;
    };
    expect(await collect(it())).toEqual(values);
  });
});
