const { dispatchError } = require("../src/util");

process.on("uncaughtException", dispatchError);

const play = require("../src/play");

play({ filePath: "test/sqek.mp3" });

setTimeout(() => {
  play({ filePath: "test/sqek.wav" });
}, 500);
