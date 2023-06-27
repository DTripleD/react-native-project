import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { StyleSheet } from "react-native";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import PostScreen from "./src/Screens/PostsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Screens/Home";

export default function App() {
  // const [isRegister, setIsRegister] = useState(false);

  const MainStack = createStackNavigator();
  return (
    <Home />
    // <NavigationContainer>
    //   <MainStack.Navigator initialRouteName="LoginScreen">
    //     <MainStack.Screen
    //       name="RegistrationScreen"
    //       component={RegistrationScreen}
    //     />
    //     <MainStack.Screen name="LoginScreen" component={LoginScreen} />
    //     <MainStack.Screen name="PostScreen" component={PostScreen} />
    //     <MainStack.Screen name="Home" component={Home} />
    //     {/* <StatusBar style="auto" /> */}
    //   </MainStack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  backImg: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
});
