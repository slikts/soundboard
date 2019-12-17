const play = require("./play");

const service = () => {
  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();

    if (!chunk) {
      return;
    }

    const { type, payload } = JSON.parse(chunk);

    if (type === "keybinds/play") {
      play(payload, logError);
    } else {
      throw Error(`Unknown action: ${chunk}`);
    }
  });
};

const logError = error => {
  process.stdout.write({
    type: "service/error",
    error: true,
    payload: error.message
  });
};

module.exports = service;
