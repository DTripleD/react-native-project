import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import RegistrationForm from "../components/RegistrationForm";

const RegistrationScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-170}
        style={styles.kav}
      >
        <ImageBackground
          source={require("../images/bg-photo.png")}
          style={styles.backImg}
          onPress={Keyboard.dismiss}
        >
          <RegistrationForm />
        </ImageBackground>
      </KeyboardAvoidingView>

      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
  backImg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default RegistrationScreen;
