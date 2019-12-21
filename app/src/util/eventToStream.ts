import { Readable } from "stream";
import { EventEmitter } from "events";

const eventToStream = (eventType: string, emitter: EventEmitter) => {
  const stream = new Readable({
    objectMode: true,
    read() {}
  });

  emitter.on(eventType, event => void stream.push(event));

  return stream;
};

export default eventToStream;
