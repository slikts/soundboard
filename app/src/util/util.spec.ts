import { Readable, Transform } from "stream";
import { finished, collect, mapStream } from ".";
import { finished as _f } from "stream";
import { promisify } from "util";
const ff = promisify(_f);

describe("util", () => {
  it("waits for finish", async () => {
    const stream = Readable.from([1, 2, 3]);
    stream.resume();
    await finished(stream);
  });

  it("collects stream", async () => {
    const values = [1, 2, 3];
    const stream = Readable.from(values);
    expect(await collect(stream)).toEqual(values);
  });

  it("maps stream", async () => {
    const values = [1, 2, 3];
    const stream = Readable.from(values);
    const add1 = (x: number) => x + 1;

    const mapped = mapStream(add1, stream);
    expect(await collect(mapped)).toEqual(values.map(add1));
  });
});
