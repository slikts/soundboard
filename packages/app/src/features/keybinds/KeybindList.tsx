import React from "react";
import { Text, Window, hot, View } from "@nodegui/react-nodegui";
import { useSelector, useDispatch } from "react-redux";

const KeybindList = () => {
  const keybinds = useSelector((state: any) => state.keybinds);
  return <Text>{JSON.stringify(keybinds)}</Text>;
};

export default KeybindList;
