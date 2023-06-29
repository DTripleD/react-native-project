import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import PostsScreen from "../Screens/PostsScreen";
import CreatePostScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Tabs = createBottomTabNavigator();

const BottomNavigation = () => {
  const navigation = useNavigation();
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
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomColor: "#BDBDBD",
          borderBottomWidth: 1,
        },
      })}
      tabBarOptions={{
        inactiveTintColor: "#212121",
        showLabel: false,
        activeTintColor: "#FFFFFF",
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                paddingRight: 16,
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Ionicons name="log-in-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          title: "Публікації",
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{
                  paddingLeft: 16,
                }}
                onPress={() => navigation.navigate("PostsScreen")}
              >
                <Ionicons name="arrow-back-sharp" size={24} color="#212121CC" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Профіль",
        }}
      />
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
    width: 70,
    height: 40,
    borderRadius: 20,
  },
  iconContainerActive: {
    backgroundColor: "#FF6C00",
  },
});

export default BottomNavigation;
