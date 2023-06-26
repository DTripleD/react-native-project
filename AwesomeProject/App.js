import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import { useState } from "react";

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("./src/images/bg-photo.png")}
          style={styles.backImg}
        >
          {isRegister ? (
            <LoginScreen setIsRegister={setIsRegister} />
          ) : (
            <RegistrationScreen setIsRegister={setIsRegister} />
          )}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  backImg: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
});
