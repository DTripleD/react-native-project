import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = "add-sharp";
          } else if (route.name === "PostsScreen") {
            iconName = "grid-outline";
          }
          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
      tabBarOptions={{
        inactiveTintColor: "#212121",
        showLabel: false,
        activeTintColor: "#FFFFFF",
      }}
    >
      <Tabs.Screen name="PostsScreen" component={PostsScreen} />
      <Tabs.Screen name="CreatePostsScreen" component={CreatePostScreen} />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerActive: {
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default Home;
