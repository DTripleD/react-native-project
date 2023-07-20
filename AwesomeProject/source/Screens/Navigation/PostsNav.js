import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import CreatePost from "../CreatePostsScreen/CreatePosts";

const BottomTabs = createBottomTabNavigator();

const PostsNav = ({ navigation }) => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          borderBottomColor: "#E8E8E8",
          borderBottomWidth: 2,
        },
      }}
    >
      <BottomTabs.Screen
        options={{
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: "center",
          headerTitleStyle: { paddingBottom: 5 },
          tabBarStyle: { display: "none" },
        }}
        name="Створити публікацію"
        component={CreatePost}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  trashButton: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default PostsNav;
