import sanitizeFilename from "sanitize-filename";
import { Readable } from "stream";
import { once } from "events";

export const sanitize = (name: string) =>
  sanitizeFilename(name.replace("/", " "));

export const finished = async (stream: Readable) => once(stream, "end");
