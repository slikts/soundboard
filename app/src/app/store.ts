import getAppDataPath from "appdata-path";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncNodeStorage } from "redux-persist-node-storage";

import rootReducer, { RootState } from "./rootReducer";
import { getServiceMiddleware } from "./service";
import { sanitize } from "../util";
import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import pkg from "../../package.json";

import path from "path";

import streamMiddleware, { StreamDispatch } from "../util/streamMiddleware";

const persistConfig = {
  key: "root",
  storage: new AsyncNodeStorage(getAppDataPath(path.join(sanitize(pkg.name))))
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// https://github.com/reduxjs/redux-toolkit/issues/289
const _store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware(),
    streamMiddleware,
    getServiceMiddleware()
  ]
});

type EnhancedStoreType = {
  dispatch: StreamDispatch<AnyAction>;
} & typeof _store;

export const store: EnhancedStoreType = _store;

export const persistor = persistStore(store);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
