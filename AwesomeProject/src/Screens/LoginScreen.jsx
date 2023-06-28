import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);
  const [isActive, setIsActive] = useState("");

  const navigation = useNavigation();

  const onLogin = () => {
    console.log(`Email:${email}`, `Password: ${password}`);
    Alert.alert(`Email:${email}`, `Password: ${password}`);
  };

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
          <View style={styles.form}>
            <Text style={styles.title}>Увійти</Text>

            <TextInput
              style={[
                styles.inputMailPassw,
                isActive === "email" && styles.inputMailPasswa,
              ]}
              placeholder="Адреса електронної пошти"
              inputMode="email"
              onBlur={() => setIsActive("")}
              onFocus={() => setIsActive("email")}
              onChangeText={setEmail}
              value={email}
              name="email"
            />
            <TextInput
              style={[
                styles.inputMailPassw,
                isActive === "password" && styles.inputMailPasswa,
              ]}
              placeholder="Пароль"
              secureTextEntry={isShown}
              onBlur={() => setIsActive("")}
              onFocus={() => setIsActive("password")}
              onChangeText={setPassword}
              value={password}
              name="password"
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

            <TouchableOpacity
              style={styles.registerButton}
              activeOpacity={0.5}
              // onPress={onLogin}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.registerButtonText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              <Text style={styles.loginLinkText}>
                Немає акаунту?{" "}
                <Text style={styles.underlingText}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>

      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "flex-end",
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },

  formContainer: {
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
  },
  addbutton: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  inputMailPasswa: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
  },
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwShow: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  underlingText: { textDecorationLine: "underline" },
  backImg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "flex-end",
  },
  pageWrapper: {
    flex: 1,
  },
  form: {
    // position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default LoginScreen;
