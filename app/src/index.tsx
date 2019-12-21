import React from "react";
import { Renderer } from "@nodegui/react-nodegui";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "./app/App";
import store, { persistor } from "./app/store";

process.title = "My NodeGui App";

Renderer.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// TODO: fix
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", () => {
    Renderer.forceUpdate();
  });
}
