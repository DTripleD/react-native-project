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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authStateChange } from "../redux/auth/authReducer";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import { handleGalleryPress } from "../utils/gallery";
import { avatarRegister } from "../utils/avatar";
import { LoaderScreen } from "./LoaderScreen";
import { authSignUpUser } from "../redux/auth/authOperations";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  useKeyboardListenerWithOpen,
  usePasswordVisibility,
} from "../utils/keyboard";
import { AddButtonPhoto } from "../../components/ReUseComponents/AddRemoveButtonPhoto/AddPhoto";
import { RemoveButtonPhoto } from "../../components/ReUseComponents/AddRemoveButtonPhoto/RemovePhoto";

export default function Registration() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { keyboardHeight, keyboardOpen } = useKeyboardListenerWithOpen(-20);

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [avatar, setAvatar] = useState("../img/Rectangle-empty.jpg");
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [image, setImage] = useState(null);
  const [isShown, setIsShown] = useState(true);

  const { showPassword, hidden, togglePasswordVisibility } =
    usePasswordVisibility(false, password);

  const uploadPhotoToServer = async (photo) => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(photo);

      const file = await response.blob();

      const imageRef = ref(storage, `userAvatars/${uniquePostId}`);

      await uploadBytes(imageRef, file);

      const link = await getDownloadURL(imageRef);

      return link;
    } catch (error) {
      console.log("uploadPhotoToServer > ", error);
      alert("Вибачте, але фото не зберіглось на сервері");
    }
  };

  const handleSubmit = async () => {
    validateName(login, setValidationError);
    validateEmail(email, setValidationError);
    validatePassword(password, setValidationError);

    if (
      (validationError === "" || !validationError) &&
      login !== null &&
      email !== null &&
      password !== ""
    ) {
      setIsShowLoader(true);

      const photo =
        avatar !== "../img/Rectangle-empty.jpg"
          ? await uploadPhotoToServer(avatar)
          : "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57";
      dispatch(authSignUpUser(login, email, password, photo)).then((data) => {
        if (data === undefined || !data.uid) {
          setIsShowLoader(false);
          alert(`Реєстрацію не виконано!`);
          return;
        }
        dispatch(authStateChange({ stateChange: true }));
        console.log(data);
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
        keyboardVerticalOffset={-270}
        style={styles.kav}
      >
        <ImageBackground
          source={require("../img/Photo-BG.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.photoContainer}>
              {!image ? (
                <AddButtonPhoto setImage={setImage} />
              ) : (
                <RemoveButtonPhoto />
              )}

              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                  }}
                />
              )}
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View>
              <Input
                inputMode="text"
                placeholder="Логін"
                value={login}
                onChangeText={setLogin}
                onBlur={validateName}
              />
              <Input
                inputMode="email"
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
                onBlur={validateEmail}
              />
              <Input
                placeholder="Пароль"
                inputMode="text"
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
              width={343}
              text="Зареєструватися"
              onPress={handleSubmit}
            />
            <View style={styles.text}>
              <Text style={styles.textColor}>Вже є акаунт?</Text>
              <CustomLink
                color="#1B4371"
                top={0}
                left={10}
                text="Увійти"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
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
    position: "relative",
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
  photoContainer: {
    marginTop: -90,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
    marginBottom: 32,
  },
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
