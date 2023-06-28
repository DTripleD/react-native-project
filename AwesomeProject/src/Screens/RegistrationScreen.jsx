import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);

  const [isActive, setIsActive] = useState("");

  const onRegister = () => {
    console.log(`Login: ${login}`, `Email:${email}`, `Password: ${password}`);
    Alert.alert(`Login: ${login}`, `Email:${email}\nPassword: ${password}`);
  };

  return (
    <ImageBackground
      source={require("../images/bg-photo.png")}
      style={styles.backImg}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-80}
        >
          <View style={styles.form}>
            <View style={styles.photoContainer}>
              <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>

            <TextInput
              style={[
                styles.inputMailPassw,
                isActive === "login" && styles.inputMailPasswa,
              ]}
              placeholder="Логін"
              onBlur={() => setIsActive("")}
              onFocus={() => setIsActive("login")}
              onChangeText={setLogin}
              value={login}
              name="login"
            />
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
              // onPress={onRegister}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              <Text style={styles.registerButtonText}>Зареєстуватися</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.loginLinkText}>
                Вже є акаунт? <Text style={styles.underlingText}>Увійти</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 30,
  },
  photoContainer: {
    marginTop: -90,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
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
    width: 343,
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
    paddingRight: 16,
  },
  passwShow: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
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
  form: {
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // marginBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default RegistrationScreen;
