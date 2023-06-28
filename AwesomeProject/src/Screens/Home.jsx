import React from "react";
import { View, StyleSheet } from "react-native";
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
      screenOptions={{
        tabBarLabelStyle: {
          display: "none",
        },
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
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.iconContainer]}>
              <Ionicons name="grid-outline" size={24} color="#212121" />
            </View>
          ),
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
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.iconAddContainer]}>
              <Ionicons name="add-sharp" size={24} color="#FFFFFF" />
            </View>
          ),

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
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.iconContainer]}>
              <Ionicons name="person-outline" size={24} color="#212121" />
            </View>
          ),
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
    width: 70,
    height: 40,
  },
  iconAddContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default Home;
