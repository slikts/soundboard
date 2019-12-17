import { Text, Window, hot, View } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import path from "path";
// TODO:
// @ts-ignore
import nodeguiIcon from "../../assets/nodegui.jpg";

import SourceList from "../features/sources/SourceList";
import KeybindList from "../features/keybinds/KeybindList";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./rootReducer";

const minSize = { width: 500, height: 520 };
const winIcon = new QIcon(path.resolve(__dirname, nodeguiIcon));
class App extends React.Component {
  render() {
    return (
      <Window
        windowIcon={winIcon}
        windowTitle="xHello 👋🏽"
        minSize={minSize}
        styleSheet={styleSheet}
      >
        <View style={containerStyle}>
          <SourceList />
          <KeybindList />
          <Text id="welcome-text">Helcome to NodeGuixx 🐕</Text>
          <Text id="step-1">1. Play around</Text>
          <Text id="step-2">2. Debug</Text>
        </View>
      </Window>
    );
  }
}

const containerStyle = `
   flex: 1;
`;

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }

  #step-1, #step-2 {
    font-size: 18px;
    padding-top: 10px;
    padding-horizontal: 20px;
  }
`;

export default hot(App);
