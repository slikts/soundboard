import { Readable } from "stream";
import { EventEmitter } from "events";

const eventToStream = (
  eventType: string | symbol,
  emitter: EventEmitter,
  errorType?: string | symbol
) => {
  const stream = new Readable({
    objectMode: true,
    read() {}
  });

  const source = normalize(emitter);

  const handler = (event: Event) => {
    void stream.push(event);
  };
  source.on(eventType, handler);

  stream.once("close", () => {
    source.off(eventType, handler);
  });

  if (errorType) {
    const errorHandler = (error?: Error) => void stream.destroy(error);
    source.on(errorType, errorHandler);
    stream.once("close", () => {
      source.off(errorType, errorHandler);
    });
  }

  return stream;
};

const normalize = (emitter: any) => {
  return {
    get on() {
      return (
        emitter.addEventListener ||
        emitter.addListener ||
        emitter.on
      ).bind(emitter);
    },
    get off() {
      return (
        emitter.removeEventListener ||
        emitter.removeListener ||
        emitter.off
      ).bind(emitter);
    }
  };
};

export default eventToStream;
