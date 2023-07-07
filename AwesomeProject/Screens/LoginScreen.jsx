// import {
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ImageBackground,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import LoginForm from "../components/LoginForm";

// const LoginScreen = () => {
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS == "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={-170}
//         style={styles.kav}
//       >
//         <ImageBackground
//           source={require("../images/bg-photo.png")}
//           style={styles.backImg}
//           onPress={Keyboard.dismiss}
//         >
//           <LoginForm />
//         </ImageBackground>
//       </KeyboardAvoidingView>

//       {/* </View> */}
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   kav: { flex: 1, width: "100%", justifyContent: "flex-end" },

//   backImg: {
//     flex: 1,
//     resizeMode: "cover",
//     width: "100%",
//     justifyContent: "flex-end",
//   },
// });

// export default LoginScreen;
