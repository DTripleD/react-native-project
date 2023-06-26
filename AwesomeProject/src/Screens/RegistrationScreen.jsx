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
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

const RegistrationScreen = ({ setIsRegister }) => {
  const [inputColorLogin, setInputColorLogin] = useState("#F6F6F6");
  const [borderColorLogin, setBorderColorLogin] = useState("#E8E8E8");
  const [inputColorEmail, setInputColorEmail] = useState("#F6F6F6");
  const [borderColorEmail, setBorderColorEmail] = useState("#E8E8E8");
  const [inputColorPassword, setInputColorPassword] = useState("#F6F6F6");
  const [borderColorPassword, setBorderColorPassword] = useState("#E8E8E8");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);

  const onRegister = () => {
    console.log(`Login: ${login}`, `Email:${email}`, `Password: ${password}`);
    Alert.alert(`Login: ${login}`, `Email:${email}\nPassword: ${password}`);
  };

  const onFocusLogin = () => {
    setInputColorLogin("#FFFFFF");
    setBorderColorLogin("#FF6C00");
  };

  const onBlurLogin = () => {
    setInputColorLogin("#F6F6F6");
    setBorderColorLogin("#E8E8E8");
  };

  const onFocusEmail = () => {
    setInputColorEmail("#FFFFFF");
    setBorderColorEmail("#FF6C00");
  };

  const onBlurEmail = () => {
    setInputColorEmail("#F6F6F6");
    setBorderColorEmail("#E8E8E8");
  };

  const onFocusPassword = () => {
    setInputColorPassword("#FFFFFF");
    setBorderColorPassword("#FF6C00");
  };

  const onBlurPassword = () => {
    setInputColorPassword("#F6F6F6");
    setBorderColorPassword("#E8E8E8");
  };

  const wasRegistered = () => {
    setIsRegister(true);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
            <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Реєстрація</Text>

        <TextInput
          style={[
            styles.inputMailPassw,
            {
              backgroundColor: inputColorLogin,
              borderColor: borderColorLogin,
            },
          ]}
          placeholder="Логін"
          inputMode="text"
          onBlur={onBlurLogin}
          onFocus={onFocusLogin}
          onChangeText={setLogin}
        />
        <TextInput
          style={[
            styles.inputMailPassw,
            {
              backgroundColor: inputColorEmail,

              borderColor: borderColorEmail,
            },
          ]}
          placeholder="Адреса електронної пошти"
          inputMode="email"
          onBlur={onBlurEmail}
          onFocus={onFocusEmail}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.inputMailPassw,
            {
              backgroundColor: inputColorPassword,
              borderColor: borderColorPassword,
            },
          ]}
          placeholder="Пароль"
          secureTextEntry={isShown}
          onBlur={onBlurPassword}
          onFocus={onFocusPassword}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.passwShow}
          activeOpacity={0.5}
          onPress={() => setIsShown(isShown === true ? false : true)}
        >
          <Text style={styles.passwShowText}>Показати</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.5}
          onPress={onRegister}
        >
          <Text style={styles.registerButtonText}>Зареєстуватися</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          activeOpacity={0.5}
          onPress={wasRegistered}
        >
          <Text style={styles.loginLinkText}>
            Вже є акаунт? <Text style={styles.underlingText}>Увійти</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 30,
  },
  photoContainer: {
    marginTop: -60,
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
});

export default RegistrationScreen;
