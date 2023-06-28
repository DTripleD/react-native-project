import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function CreatePostScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-60}
      >
        <View style={styles.container}>
          <View style={styles.ovalContainer}>
            <TouchableOpacity style={styles.oval}>
              <Ionicons
                name={"camera-sharp"}
                size={24}
                color={"#BDBDBD"}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.photoText}>Завантажте фото</Text>

          <TextInput placeholder="Назва..." style={styles.inputName} />

          <View style={styles.searchSection}>
            <Ionicons
              name={"location-outline"}
              size={24}
              color={"#BDBDBD"}
              style={styles.searchIcon}
            />
            <TextInput style={styles.inputPlace} placeholder="Місцевість..." />
          </View>

          <TouchableOpacity style={styles.registerButton} activeOpacity={0.5}>
            <Text style={styles.registerButtonText}>Опубліковати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} activeOpacity={0.5}>
            <Ionicons name={"trash-outline"} size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  photoText: { alignSelf: "flex-start", color: "#BDBDBD" },
  container: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "flex-end",
    height: "100%",
  },
  ovalContainer: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: [{ translateX: -30 }, { translateY: -30 }],
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: "100%",
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
  },
  oval: {
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginTop: 16,
  },
  searchIcon: {
    // padding: 10,
  },
  inputPlace: {
    padding: 16,
    paddingLeft: 4,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
  },
  inputName: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    padding: 16,
    paddingLeft: 0,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 32,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  deleteButton: {
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingLeft: 23,
    paddingRight: 23,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: "auto",
  },
  screenWrapper: { flex: 1, width: "100%", justifyContent: "flex-end" },
});

export default CreatePostScreen;
