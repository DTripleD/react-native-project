import { useNavigation } from "@react-navigation/native";
import { useReducer, useState } from "react";
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

const initialState = {
  email: "",
  password: "",
};

import { validateEmail, validationPassword } from "../services";
import { useDispatch } from "react-redux";
import { authSignIn } from "../redux/auth/authoperations";
import { ErrorText } from "../components//ReUseComponents/ErrorText/ErrorText";

const reducerInput = (state, actions) => {
  switch (actions.type) {
    case "Email": {
      return { ...state, email: actions.payload };
    }
    case "Password": {
      return { ...state, password: actions.payload };
    }
    default: {
      return state;
    }
  }
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);
  const [isActive, setIsActive] = useState("");

  const [input, setInput] = useState(initialState);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const navigation = useNavigation();

  const [state, onDispatch] = useReducer(reducerInput, initialState);

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (isValidEmail && isValidPassword && input.email) {
      Keyboard.dismiss();

      dispatch(authSignIn(input));

      setInput(() => initialState);

      navigation.navigate("BottomNavigation");
    } else {
      console.log("Empty fields");
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Увійти</Text>

      <View style={{ width: "100%" }}>
        <TextInput
          style={[
            styles.inputMailPassw,
            isActive === "email" && styles.inputMailPasswa,
          ]}
          placeholder="Адреса електронної пошти"
          inputMode="email"
          onBlur={() => {
            setIsActive("");
            onDispatch({ type: "Email", payload: false });
          }}
          onFocus={() => {
            setIsActive("email");
            onDispatch({ type: "Email", payload: true });
          }}
          // onChangeText={setEmail}
          value={input.email}
          name="email"
          onChangeText={(value) => {
            validateEmail(value, setIsValidEmail);
            setInput((prev) => ({ ...prev, email: value }));
          }}
        />
        {!isValidEmail ? <ErrorText text="Email invalid!" /> : ""}
      </View>
      <View style={{ width: "100%" }}>
        <TextInput
          style={[
            styles.inputMailPassw,
            isActive === "password" && styles.inputMailPasswa,
          ]}
          placeholder="Пароль"
          secureTextEntry={isShown}
          onBlur={() => {
            setIsActive("");
            onDispatch({ type: "Password", payload: false });
          }}
          onFocus={() => {
            setIsActive("password");
            onDispatch({ type: "Password", payload: true });
          }}
          value={input.password}
          name="password"
          onChangeText={(value) => {
            validationPassword(value, setIsValidPassword);
            setInput((prev) => ({ ...prev, password: value }));
          }}
        />
        {!isValidPassword ? (
          <ErrorText text="Password should be example (Xx2$xxxx) at 8 character!" />
        ) : (
          ""
        )}
      </View>

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
        disabled={!isValidPassword}
        onPress={handleLogin}
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
  );
};

const styles = StyleSheet.create({
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

export default LoginForm;
