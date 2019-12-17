import { Renderer } from "@nodegui/react-nodegui";
import React from "react";

const { spawn } = require("child_process");

const fs = require("fs");

import * as ioHook from "iohook";

// @ts-ignore
import * as robot from "robotjs";

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

// ioHook.start(false);
import { Provider } from "react-redux";

import store from "./app/store";

process.title = "My NodeGui App";

const App = require("./app/App").default;
Renderer.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// TODO:
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", () => {
    Renderer.forceUpdate();
  });
}
