import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = () => {
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
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "#BDBDBD",
            borderWidth: 1,
          },
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "#BDBDBD",
            borderWidth: 1,
          },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Профіль",
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "#BDBDBD",
            borderWidth: 1,
          },
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
