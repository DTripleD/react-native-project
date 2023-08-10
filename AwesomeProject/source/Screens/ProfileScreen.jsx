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
const backImage = require("../Source/Photo_BG.png");

import { useDispatch, useSelector } from "react-redux";
import { selectAuthPosts } from "../Redux/posts/postsSelectors";
import { selectUser } from "../Redux/auth/authSelectors";
import { selectComments } from "../Redux/comments/commentsSelectors";
import { AntDesign } from "@expo/vector-icons";
import { fetchLogOutUser } from "../Redux/auth/authOperations";
import { useState } from "react";

function ProfileScreen({ navigation }) {
  const [like, setLike] = useState(0);

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
      <ImageBackground source={backImage} style={styles.backImg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.photoContainer}>
              <Image
                source={{
                  uri: `${
                    photo === null
                      ? "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57"
                      : photo
                  }`,
                }}
                style={styles.image}
              />
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
            <View style={styles.mapWrapper}>
              {posts.map((item) => {
                return (
                  <View key={item.id} style={styles.elementWrapper}>
                    <Image
                      source={{ uri: `${item.photo}` }}
                      style={styles.elementImageWrapper}
                    />
                    <Text style={styles.posText}>{item.title}</Text>
                    <View style={styles.buttonsWrapper}>
                      <View style={styles.reactions}>
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
                          onPress={() => setLike((prev) => prev + 1)}
                        >
                          <Feather name="thumbs-up" size={18} color="gray" />
                          <Text>{like}</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={styles.info}
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                            component: "ProfileScreen",
                          })
                        }
                      >
                        <EvilIcons name="location" size={24} color="gray" />
                        <Text style={styles.infolink}>{item.inputRegion}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
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
    minHeight: 530,
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 200,
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
  },

  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
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
    gap: 6,
  },
  infolink: {
    textDecorationLine: "underline",
  },
  mapWrapper: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    padding: 16,
  },
  image: { width: "100%", height: "100%", borderRadius: 15 },
  elementWrapper: {
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  elementImageWrapper: { width: 380, height: 280, borderRadius: 15 },
  buttonsWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "85%",
  },
  reactions: { flexDirection: "row" },
});

export default ProfileScreen;
