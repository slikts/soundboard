const { spawn } = require("child_process");

const service = spawn("node", ["index.js"]);
// const service = spawn("soundboard-service.exe");

service.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
});

service.stdin.setEncoding("utf-8");

setInterval(() => {
  service.stdin.write(
    JSON.stringify({
      type: "keybinds/play",
      payload: { filePath: "test/sqek.mp3" }
    })
  );
}, 1000);
