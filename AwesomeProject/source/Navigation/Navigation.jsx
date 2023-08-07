import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "./Home";
import { Ionicons } from "@expo/vector-icons";
import ProfilePhotoScreen from "../Screens/ProfilePhotoScreen";
import Map from "../Screens/Map";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Comments from "../Screens/Comments";

const MainStack = createStackNavigator();

const Navigation = ({ route }) => {
  console.log(route);
  const navigation = useNavigation();
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
      initialParams={{ params: route }}
    >
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Registratione" component={RegistrationScreen} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="CommentsNav"
        component={Comments}
        screenOptions={{
          headerShown: true,
          // tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 2,
          },
          tabBarStyle: { display: "none" },
        }}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerShown: true,
          title: "Карта",
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: "center",
          headerTitleStyle: { paddingBottom: 5 },
          title: "Коментарі",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 90,
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <MainStack.Screen
        name="Map"
        screenOptions={{
          headerShown: true,
          // tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 2,
          },
          tabBarStyle: { display: "none" },
        }}
        options={{
          headerShown: true,
          title: "Карта",
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Home", { screen: "PostList" })
              }
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: "center",
          headerTitleStyle: { paddingBottom: 5 },
        }}
        component={Map}
        initialParams={{ params: route }}
      />
      <MainStack.Screen
        name="ProfilePhotoScreen"
        component={ProfilePhotoScreen}
      />
    </MainStack.Navigator>
  );
};

export default Navigation;
