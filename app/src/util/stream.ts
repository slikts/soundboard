import { Transform, Readable, TransformOptions } from "stream";
import { once } from "events";

export const finished = async (stream: Readable) => once(stream, "end");

export const collect = <A>(stream: Readable) =>
  reduce(stream, [], (a: A, b: A[]) => void b.push(a));

export const reduce = <A, B>(
  stream: Readable,
  init: B,
  f: (a: A, b: B) => void
) =>
  new Promise((resolve, reject) => {
    const result: B = init;
    stream.on("data", (chunk: A) => void f(chunk, result));
    stream.once("end", () => void resolve(result));
    stream.once("error", error => void reject(error));
  });

export const map = <A, B>(f: (a: A) => B, source: Readable) =>
  transform(source, {
    transform(chunk, _, callback) {
      try {
        this.push(f(chunk));
        return callback();
      } catch (e) {
        return callback(e);
      }
    }
  });

export const filter = <A>(f: (a: A) => boolean, source: Readable) =>
  transform(source, {
    transform(chunk, _, callback) {
      try {
        if (f(chunk)) {
          this.push(chunk);
        }
        return callback();
      } catch (e) {
        return callback(e);
      }
    }
  });

const transform = (source: Readable, opts: TransformOptions) =>
  source.pipe(
    new Transform({
      objectMode: true,
      ...opts
    })
  );
