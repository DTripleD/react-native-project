import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";

import { readDataPosts } from "../../FireBase/index";
import { PostsItem } from "../../components/ReUseComponents/PostsItem/PostsItem";
import { AddButtonPhoto } from "../../components/ReUseComponents/AddRemoveButtonPhoto/AddPhoto";
import { RemoveButtonPhoto } from "../../components/ReUseComponents/AddRemoveButtonPhoto/RemovePhoto";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { name, photo, userId } = useSelector((state) => state.verify);
  const isRefresh = useSelector((state) => state.post);

  useEffect(() => {
    readDataPosts().then((snapshoot) => {
      snapshoot.forEach((item) => {
        if (!posts.find((newItem) => newItem.id === item.key)) {
          item.val().userId === userId
            ? setPosts((prev) => prev.concat({ ...item.val(), id: item.key }))
            : null;
        }
      });
    });
  }, [isRefresh]);

  return (
    <ImageBackground
      source={require("../../assets/img/bg-photo.png")}
      style={styles.img}
    >
      <View style={styles.conteiner}>
        <ImageBackground
          borderRadius={16}
          source={{ uri: photo }}
          style={styles.conteiner_img}
        >
          {!photo ? <AddButtonPhoto /> : <RemoveButtonPhoto />}
        </ImageBackground>
        <Text style={styles.title_name}>{name}</Text>
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostsItem navigation={navigation} item={item} />
          )}
        ></FlatList>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  conteiner: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  conteiner_img: {
    width: 120,
    height: 120,
    top: -80,
  },
  title_name: {
    fontSize: 30,
    lineHeight: 35,
    marginTop: -50,
    marginBottom: 33,
    fontWeight: "500",
  },
});
