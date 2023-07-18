import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import OverlayImage from "../components/Others/OverlayImage";
import CustomButton from "../components/Others/Button";
import Input from "../components/Inputs/Input";
import CustomLink from "../components/Others/Link";
import Title from "../components/Others/Title";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { validateEmail, validatePassword } from "../utils/validation";
import { authSignInUser } from "../redux/auth/authOperations";
import { LoaderScreen } from "./LoaderScreen";
import { useDispatch } from "react-redux";
import { useKeyboardListener, usePasswordVisibility } from "../utils/keyboard";
import { authStateChange } from "../redux/auth/authReducer";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboardListener(100);

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isShown, setIsShown] = useState(true);

  const { showPassword, hidden, togglePasswordVisibility } =
    usePasswordVisibility(false, password);

  const handleSubmit = () => {
    validateEmail(email, setValidationError);
    validatePassword(password, setValidationError);

    if (
      (validationError === "" || !validationError) &&
      password !== "" &&
      email !== ""
    ) {
      setIsShowLoader(true);
      dispatch(authSignInUser(email, password)).then((data) => {
        if (data === undefined || !data.user) {
          setIsShowLoader(false);
          alert(`Вхід не виконано!`);
          return;
        }
        dispatch(authStateChange({ stateChange: true }));
      });
    }
  };

  if (isShowLoader) {
    return <LoaderScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-170}
        style={styles.kav}
      >
        <ImageBackground
          source={require("../img/Photo-BG.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View
              style={[
                styles.overlayContainer,
                { paddingBottom: keyboardHeight },
              ]}
            >
              <OverlayImage top={535} />
              <View style={styles.formContainer}>
                <Title title={"Увійти"} top={200} />
                <View style={{ paddingBottom: keyboardHeight }}>
                  <Input
                    inputMode="email"
                    placeholder="Адреса електронної пошти"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={validateEmail}
                  />
                  <Input
                    inputMode="text"
                    placeholder="Пароль"
                    secureTextEntry={isShown}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={validatePassword}
                    style={{ position: "relative" }}
                  />
                  <TouchableOpacity
                    style={styles.passwShow}
                    activeOpacity={0.5}
                    onPress={() => setIsShown(!isShown)}
                  >
                    <Text style={styles.passwShowText}>
                      {isShown ? "Показати" : "Сховати"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <CustomButton
                  color="#FF6C00"
                  width={343}
                  text="Увійти"
                  onPress={handleSubmit}
                />
                <View style={styles.text}>
                  <Text style={styles.textColor}>Немає акаунту?</Text>
                  <CustomLink
                    color="#1B4371"
                    top={0}
                    left={10}
                    text="Зареєструватися"
                    onPress={() => navigation.navigate("Registration")}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "flex-end",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textColor: {
    color: "#1B4371",
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwShow: {
    top: -49,
    left: 260,
  },
});
