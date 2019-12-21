import { Readable } from "stream";
import { finished } from ".";

describe("util", () => {
  it("finished", async () => {
    const stream = Readable.from([1, 2, 3]);
    stream.resume();
    await finished(stream);
  });
});
