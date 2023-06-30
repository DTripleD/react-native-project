import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";

import PostScreen from "../Screens/PostsScreen";

import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import BottomNavigation from "./BottomNavigation";

export default function MainNavigator() {
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
        <MainStack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
        />
        <MainStack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            headerShown: true,
            title: "Коментарі",
            headerStyle: {
              borderBottomColor: "#BDBDBD",
              borderBottomWidth: 1,
            },
          }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: true, title: "Мапа" }}
        />
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
