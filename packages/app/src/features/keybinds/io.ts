import * as ioHook from "iohook";

// let state = false;

// setInterval(() => {
//   // robot.keyToggle(a"a", state ? "up" : "down");
//   state = !state;
// }, 2000);

// ioHook.on("keydown", event => {
//   if (event.keycode === 82) {
//     // ks.sendKey("a");
//   }
// });

export const ioMiddleware = ({ io = ioHook }: any = {}) => {
  let keycodes = [82];
  let _state;
  let _dispatch;

  io.on("keydown", event => {
    console.log(event.keycode);
    if (keycodes.includes(event.keycode)) {
      // ks.sendKey("a");
    }
  });
  io.start(false);

  return ({ getState, dispatch }: any) => {
    _dispatch = dispatch;
    _state = getState();
  };
};
