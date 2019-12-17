const { spawn } = require("child_process");

const service = spawn("node", ["index.js"]);
// const service = spawn("soundboard-service.exe");

service.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
});

service.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});

service.stdin.setEncoding("utf-8");

setInterval(() => {
  service.stdin.write(
    JSON.stringify({
      type: "playlist/play",
      payload: { filePath: "test/sqek.mp3" }
    })
  );
}, 1000);
