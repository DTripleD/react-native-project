import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./source/Navigation/Navigation";
import { Provider } from "react-redux";

import LoadingScreen from "./source/Elements/Loading";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./source/Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingScreen />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </TouchableWithoutFeedback>
      </PersistGate>
    </Provider>
  );
}
