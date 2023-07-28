import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";
import PostsNav from "./PostsNav";
import ProfileScreen from "../Screens/ProfileScreen";
import CommentsNav from "./CommentsNavigator";
import ProfilePhotoScreen from "../Screens/ProfilePhotoScreen";

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
      <MainStack.Screen name="PostsNav" component={PostsNav} />
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <MainStack.Screen name="CommentsNav" component={CommentsNav} />
      <MainStack.Screen
        name="ProfilePhotoScreen"
        component={ProfilePhotoScreen}
      />
    </MainStack.Navigator>
  );
};

export default Navigation;
