import { useState, useEffect, useReducer } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SignInUser } from "../api/auth/singin";

import {
  validateName,
  validateEmail,
  validationPassword,
  reducerInput,
} from "../services";

import { AddButtonPhoto } from "../components/ReUseComponents/AddRemoveButtonPhoto/AddPhoto";
import { RemoveButtonPhoto } from "../components/ReUseComponents/AddRemoveButtonPhoto/RemovePhoto";
import { ErrorText } from "../components//ReUseComponents/ErrorText/ErrorText";
import { authSignUp } from "../redux/auth/authoperations";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const initSignInUser = new SignInUser();

const RegistrationForm = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);

  const [isActive, setIsActive] = useState("");

  const [input, setInput] = useState(initialState);
  const [image, setImage] = useState(null);

  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [state, onDispatch] = useReducer(reducerInput, initialState);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (isValidName && isValidEmail && isValidPassword && input.email) {
      dispatch(authSignUp({ ...input, photo: image }));

      // initSignInUser
      //   .createUser({ ...input, photo: image })
      //   .then(
      //     ({
      //       username: displayName,
      //       id: uid,
      //       email,
      //       avatarUrl: photoURL,
      //       token,
      //     }) => {
      //       dispatch(
      //         saveUserProfile({ displayName, uid, email, photoURL, token })
      //       );
      //     }
      //   );

      setInput(() => initialState);

      navigation.navigate("BottomNavigation");
    } else {
      console.log("empty field");
    }
  };
  return (
    <View style={styles.form}>
      <View style={styles.photoContainer}>
        {!image ? (
          <AddButtonPhoto setImage={setImage} />
        ) : (
          <RemoveButtonPhoto />
        )}

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%", borderRadius: 16 }}
          />
        )}
      </View>
      <Text style={styles.title}>Реєстрація</Text>
      <View style={{ width: "100%" }}>
        <TextInput
          style={[
            styles.inputMailPassw,
            isActive === "login" && styles.inputMailPasswa,
          ]}
          placeholder="Логін"
          onBlur={() => {
            setIsActive("");
            onDispatch({ type: "username", payload: false });
          }}
          onFocus={() => {
            setIsActive("login");
            onDispatch({ type: "username", payload: true });
          }}
          value={input.username}
          name="login"
          onChangeText={(value) => {
            validateName(value, setIsValidName);
            setInput((prev) => ({ ...prev, username: value }));
          }}
        />
        {!isValidName ? (
          <ErrorText text="Name is required and at least 8 characters!" />
        ) : (
          ""
        )}
      </View>
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
          onChangeText={(value) => {
            validateEmail(value, setIsValidEmail);
            setInput((prev) => ({ ...prev, email: value }));
          }}
          value={input.email}
          name="email"
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
          passwordRules={{ minlenght: 8 }}
          onBlur={() => {
            setIsActive("");
            onDispatch({ type: "Password", payload: false });
          }}
          onFocus={() => {
            setIsActive("password");
            onDispatch({ type: "Password", payload: true });
          }}
          onChangeText={(value) => {
            setInput((prev) => ({ ...prev, password: value }));
            validationPassword(value, setIsValidPassword);
          }}
          value={input.password}
          name="password"
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
        disabled={!isValidPassword}
        // onPress={onRegister}
        onPress={handleSubmit}
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
  );
};

export default RegistrationForm;

const styles = StyleSheet.create({
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
  pageWrapper: {
    flex: 1,
  },
  conteinerImg: {
    position: "absolute",
    left: "35%",
    width: 120,
    height: 120,
    zIndex: 1,
    borderRadius: 16,
  },
});
