const { spawn } = require("child_process");

import { play, stop } from "../features/playlist/playlistSlice";

export const serviceMiddleware = (
  serviceArgs = ["C:\\work\\soundboard-server\\soundboard-server.exe"],
  _spawn = spawn
) => ({
  // getState,
  dispatch
}: any) => {
  const service = _spawn(...serviceArgs);

  console.log(123213);

  service.stdout.on("data", (data: any) => {
    console.log("stdout", data);
    dispatch(JSON.parse(data));
  });
  service.stderr.on("data", (data: any) => {
    console.log("stderr", data);
    dispatch(JSON.parse(data));
  });

  service.stdin.setEncoding("utf-8");

  return (next: any) => (action: any) => {
    const result = next(action);

    if ([play.type, stop.type].includes(action.type)) {
      service.stdin.write(JSON.stringify(action));
    }
    return result;
  };
};
