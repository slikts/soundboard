import ioHook from "iohook";
import eventToStream from "../../util/eventToStream";
import through2 from "through2";

// let state = false;

// setInterval(() => {
//   // robot.keyToggle(a"a", state ? "up" : "down");
//   state = !state;
// }, 2000);

ioHook.on("keydown", event => {
  // console.log("evt", event);
  if (event.keycode === 82) {
    // ks.sendKey("a");sdadsfasd
  }
});

// export const ioMiddleware = ({ io = ioHook }: any = {}) => {
//   let keycodes = [82];
//   let _state;
//   let _dispatch;

//   io.on("keydown", (event: KeyboardEvent) => {
//     console.log(event.keycode);
//     if (keycodes.includes(event.keycode)) {
//       // ks.sendKey("a");
//     }
//   });
//   io.start(false);

//   return ({ getState, dispatch }: any) => {
//     _dispatch = dispatch;
//     _state = getState();
//   };
// };

const ioStream = () => {
  const stream = eventToStream("keydown", ioHook);
  ioHook.start(false);

  return stream.pipe(
    through2.obj(function(chunk, _, callback) {
      this.push({
        type: chunk.type,
        payload: chunk
      });
      callback();
    })
  );
};

export default ioStream;
