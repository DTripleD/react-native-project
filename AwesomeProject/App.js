import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./source/Screens/Navigation/Navigation";
import { Provider } from "react-redux";
import store from "./source/Redux/store";
import LoadingScreen from "./source/Elements/Loading";
import AuthChack from "./source/Elements/AuthChack";

export default function App() {
  return (
    <Provider store={store}>
      <>
        <LoadingScreen />
        <AuthChack>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </TouchableWithoutFeedback>
        </AuthChack>
      </>
    </Provider>
  );
}
