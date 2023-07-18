import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { attention } from "../utils/form";
import { Ionicons } from "@expo/vector-icons";
import { TabHeaderNavBack } from "../../components/ReUseComponents/tabHeaderNav/TabHeaderNavBack";
import { TabHederLogOut } from "../../components/ReUseComponents/tabHeaderNav/TabHeaderNavLogOut";
import { AntDesign } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const screenOptions = ({ navigation, route }) => ({
  headerShown: true,
  headerTitleAlign: "center",
  tabBarShowLabel: false,
  animationEnabled: true,
  swipeEnabled: true,
  tabBarHideOnKeyboard: true,
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarInactiveBackgroundColor: "transparent",
  tabBarActiveTintColor: "#fff",
  tabBarInactiveTintColor: "#000",
  tabBarStyle: {
    paddingBottom: 22,
    paddingHorizontal: 40,
    paddingTop: 10,
    height: 60,
  },
  tabBarItemStyle: { borderRadius: 50, height: 40 },
});

export const Home = ({ navigation, route, options }) => {
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        animationEnabled: true,
        swipeEnabled: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          paddingBottom: 22,
          paddingHorizontal: 40,
          paddingTop: 10,
          height: 60,
        },
        tabBarItemStyle: { borderRadius: 50, height: 40 },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={() => ({
          headerRight: () => <TabHederLogOut onLogOut={handleLogOut} />,
          title: "Публікації",
          headerRightContainerStyle: true,
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        })}
      />

      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={() => ({
          headerLeft: () => <TabHeaderNavBack />,
          title: "Створити публікацію",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="md-add-outline" size={23} color={color} />;
          },
        })}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => {},
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons name="md-person-outline" size={24} color={color} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTintColor: "grey",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 17,
    color: "#212121",
  },
  headerTitleContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerRightContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",

    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    justifyContent: "flex-end",
    alignItems: "center",

    paddingBottom: 7,
    paddingHorizontal: 16,
  },
  tabBarStyle: {
    paddingLeft: 60,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarItemStyle: {
    paddingTop: 9,
    paddingBottom: 35,
    height: 85,
  },
  tabItemActive: {
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    activeFill: "#FF6C00",
    inActiveFill: "grey",
  },
});
