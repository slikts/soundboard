import { Readable } from "stream";
import { finished, collect, map, filter } from "./stream";

describe("stream utils", () => {
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

    const mapped = map(add1, stream);
    expect(await collect(mapped)).toEqual(values.map(add1));
  });

  it("filters stream", async () => {
    const values = [1, 2, 3, 4, 5];
    const stream = Readable.from(values);
    const pred = (n: number) => n < 2 && n >= 4;
    const filtered = filter(pred, stream);
    expect(await collect(filtered)).toEqual(values.filter(pred));
  });
});
