import React from "react";
import { View, LineEdit, Button } from "@nodegui/react-nodegui";
import { QPushButtonEvents } from "@nodegui/nodegui";

const buttonEventHandler = {
  [QPushButtonEvents.clicked]: () => {
    // open("https://react.nodegui.org").catch(console.log);
    console.log(123);
  }
};

const Sources = () => {
  return (
    <View
      styleSheet={`
  flex: 1;
  flex-direction: 'row';
  justify-content:'center'; 
`}
    >
      <LineEdit text="foo" />
      <Button
        on={buttonEventHandler}
        text="Use"
        styleSheet={`
    flex-shrink: 1;
  `}
      />
    </View>
  );
};

export default Sources;
