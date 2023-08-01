import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const backImage = require("../Source/Photo_BG.png");

import { useDispatch, useSelector } from "react-redux";
import { selectAuthPosts } from "../Redux/posts/postsSelectors";
import { selectUser } from "../Redux/auth/authSelectors";
import { selectComments } from "../Redux/comments/commentsSelectors";
import { AntDesign } from "@expo/vector-icons";
import { fetchLogOutUser } from "../Redux/auth/authOperations";

const BottomTabsProf = createBottomTabNavigator();

function ProfileScreen({ navigation }) {
  const allComments = useSelector(selectComments);
  const dispatch = useDispatch();

  const getCommentsCount = (id) => {
    const comcount = allComments.filter((item) => item.postId === id).length;
    return comcount;
  };

  const posts = useSelector(selectAuthPosts);
  const { name, photo } = useSelector(selectUser);

  const handleLogOut = () => {
    dispatch(fetchLogOutUser()).then((result) => {
      result.type === "auth/fetchLogOutUser/fulfilled" &&
        navigation.navigate("Login");
      result.type !== "auth/fetchLogOutUser/fulfilled" &&
        alert("Incorrect logOut!!!");
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={backImage} style={styles.backImg}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.container}>
              <View style={styles.photoContainer}>
                <Image
                  source={{ uri: `${photo}` }}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                ></Image>
                <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.5}
                onPress={handleLogOut}
              >
                <Feather name="log-out" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.title}>{name}</Text>
              <View
                style={{ flex: 1, justifyContent: "center", width: "100%" }}
              >
                {posts.map((item) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        marginTop: 20,
                        marginBottom: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: `${item.photo}` }}
                        style={{ width: 380, height: 280, borderRadius: 15 }}
                      />
                      <Text style={styles.posText}>{item.title}</Text>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "85%",
                        }}
                      >
                        <TouchableOpacity
                          style={styles.info}
                          onPress={() =>
                            navigation.navigate("CommentsNav", {
                              postId: item.id,
                              postImg: item.photo,
                            })
                          }
                        >
                          <Feather
                            name="message-circle"
                            size={18}
                            color="gray"
                          />
                          <Text>{getCommentsCount(item.id)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.info}
                          onPress={() =>
                            navigation.navigate("Map", {
                              location: item.location,
                            })
                          }
                        >
                          <EvilIcons name="location" size={24} color="gray" />
                          <Text style={styles.infolink}>
                            {item.inputRegion}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  logoutButton: {
    marginLeft: 350,
    marginTop: -40,
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 200,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "visible",
  },

  addbutton: {
    marginTop: -40,
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  addButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  passwShow: {
    top: -34,
    left: 130,
  },
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
  posText: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginLeft: 40,
    fontWeight: "500",
    fontSize: 16,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 10,
  },
  infolink: {
    textDecorationLine: "underline",
  },
});

export default ProfileScreen;
