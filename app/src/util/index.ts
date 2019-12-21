import sanitizeFilename from "sanitize-filename";
import { Readable } from "stream";
import { once } from "events";

export const sanitize = (name: string) =>
  sanitizeFilename(name.replace("/", " "));

export const finished = async (stream: Readable) => once(stream, "end");

export const collect = async (xs: AsyncIterable<any>) => {
  let result = [];
  for await (const x of xs) {
    result.push(x);
  }
  return result;
};
