import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "./Home";

import ProfileScreen from "../Screens/ProfileScreen";
import CommentsNav from "./CommentsNavigator";
import ProfilePhotoScreen from "../Screens/ProfilePhotoScreen";
import MapNav from "./Mapnav";

const MainStack = createStackNavigator();

const Navigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Registratione" component={RegistrationScreen} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="CommentsNav" component={CommentsNav} />
      <MainStack.Screen name="MapNav" component={MapNav} />
      <MainStack.Screen
        name="ProfilePhotoScreen"
        component={ProfilePhotoScreen}
      />
    </MainStack.Navigator>
  );
};

export default Navigation;
