import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/ProfileScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLogOutUser } from "../Redux/auth/authOperations";
import { fetchGetAllPosts } from "../Redux/posts/postsOperations";
import { fetchGetAllComments } from "../Redux/comments/commentsOperations";
import { Ionicons } from "@expo/vector-icons";
import CreatePost from "../Screens/CreatePosts";
import PostList from "../Screens/PostList";

const MainTabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(fetchLogOutUser()).then((result) => {
      result.type === "auth/fetchLogOutUser/fulfilled" &&
        navigation.navigate("Login");
      result.type !== "auth/fetchLogOutUser/fulfilled" &&
        alert("Incorrect logOut!!!");
    });
  };

  useEffect(() => {
    dispatch(fetchGetAllComments());
    dispatch(fetchGetAllPosts());
  }, [dispatch]);

  return (
    <MainTabs.Navigator
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
      {/* GRID */}
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <AntDesign name="appstore-o" size={24} color={color} />;
          },
          headerTitleAlign: "center",
          headerRightContainerStyle: { paddingRight: 20 },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() => {
                handleLogOut();
              }}
            >
              <Feather name="log-out" size={24} color="gray" />
            </TouchableOpacity>
          ),
          title: "Публікації",
        }}
        name="PostList"
        component={PostList}
      />

      {/* ADD BUTTON */}
      <MainTabs.Screen
        options={{
          unmountOnBlur: true,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => {
            return <AntDesign name="plus" size={24} color={color} />;
          },
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
        name="Створити публікацію"
        component={CreatePost}
      />

      {/* PROFILE BUTTON */}
      <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name="md-person-outline" size={24} color={color} />
            );
          },
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderTopColor: "#999999",
    borderTopWidth: 1,
  },
  addButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  gridButton: {
    marginRight: 40,
  },
  userButton: {
    marginLeft: 40,
  },
});

export default Home;
