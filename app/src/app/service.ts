import { spawn } from "child_process";
import path from "path";

// import { AsyncIterableX as AsyncIterable } from "ix/asynciterable";
// import "ix/add/asynciterable-operators/foreach";

import { Middleware, Action } from "redux";

import { play, stop } from "../features/playlist/playlistSlice";

export const getServiceMiddleware = (
  serviceArgs: [string] = [path.join(__dirname, "../bin/service.exe")],
  _spawn = spawn
) => ({
  // getState,
  dispatch
}: any) => {
  const service = _spawn(...serviceArgs);

  // service.stdout.on("data", (data: any) => {
  //   console.log("stdout", data);
  //   dispatch(JSON.parse(data));
  // });
  // service.stderr.on("data", (data: any) => {
  //   console.log("stderr", data);
  //   dispatch(JSON.parse(data));
  // });

  return (next: any) => (action: any) => {
    const result = next(action);

    if ([play.type, stop.type].includes(action.type)) {
      service.stdin.write(JSON.stringify(action));
    }
    return result;
  };
};

export const iteratorMiddleware: Middleware = ({
  dispatch
}) => next => action => {
  // if (Symbol.asyncIterator in action) {
  //   AsyncIterable.from<Action>(action).forEach(x => {
  //     dispatch(x);
  //   });
  //   return;
  // }

  return next(action);
};
