const portAudio = require("node-portaudio");

const play = require("./play");
const { dispatch } = require("./util");

const service = () => {
  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();

    if (!chunk) {
      return;
    }

    const { type, payload } = JSON.parse(chunk);

    if (type === "playlist/play") {
      play(payload);
    } else {
      throw Error(`Unknown action: ${chunk}`);
    }
  });

  dispatch({
    type: "service/info",
    payload: {
      version: require("../package.json").version,
      node: process.version
    }
  });

  dispatch({
    type: "service/devices",
    payload: portAudio.getDevices()
  });
};

module.exports = service;
