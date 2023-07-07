import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { TouchableOpacity, View, Text, Dimensions } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//components
import HomeScreen from "../Screens/mainScreens/HomeScreen";
import MapScreen from "../Screens/nestedSreens/MapScreen";
import CommentsScreen from "../Screens/nestedSreens/CommentsScreen";
import PostsScreen from "../Screens/mainScreens/PostsScreen";
import ProfileScreen from "../Screens/mainScreens/ProfileScreen";

import { TabHederLogOut } from "../components/ReUseComponents/tabHeaderNav/TabHeaderNavLogOut";
import { TabHeaderNavBack } from "../components/ReUseComponents/tabHeaderNav/TabHeaderNavBack";

import { authSignOut } from "../redux/auth/authOperations";

const MainTabs = createBottomTabNavigator();

const MainTabsNav = () => {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authSignOut());
  };

  return (
    <MainTabs.Navigator
      backBehavior="history"
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
      <MainTabs.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerRight: () => <TabHederLogOut onLogOut={handleLogOut} />,
          title: "Публікації",
          headerRightContainerStyle: true,
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        })}
      />
      <MainTabs.Screen
        name="Post"
        component={PostsScreen}
        options={() => ({
          headerLeft: () => <TabHeaderNavBack />,
          title: "Створити публікацію",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="md-add-outline" size={23} color={color} />;
          },
        })}
      />
      <MainTabs.Screen
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
      <MainTabs.Screen
        name="Comment"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Коментарі",
          headerLeft: () => <TabHeaderNavBack navigation={navigation} />,
          tabBarIcon: () => {},
          tabBarButton: () => {},
        })}
      />
      <MainTabs.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Мапа",
          headerLeft: () => <TabHeaderNavBack navigation={navigation} />,
          tabBarIcon: (focused, color, size) => {},
          tabBarButton: () => {},
        })}
      />
    </MainTabs.Navigator>
  );
};

export default MainTabsNav;
