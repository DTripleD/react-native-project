import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { StyleSheet } from "react-native";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import PostScreen from "./src/Screens/PostsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Screens/Home";
import CommentsScreen from "./src/Screens/CommentsScreen";
import MapScreen from "./src/Screens/MapScreen";

export default function App() {
  // const [isRegister, setIsRegister] = useState(false);

  const MainStack = createStackNavigator();
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerTitleAlign: "center", headerShown: false }}
      >
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        <MainStack.Screen name="PostScreen" component={PostScreen} />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: true }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: true }}
        />
        {/* <StatusBar style="auto" /> */}
      </MainStack.Navigator>
    </NavigationContainer>
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
