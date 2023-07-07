import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Text, View, StyleSheet, Image, FlatList } from "react-native";

import { readDataPosts } from "../../FireBase";

import { PostsItem } from "../../components/ReUseComponents/PostsItem/PostsItem";

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const {
    name,
    email,
    photo: userPhoto,
  } = useSelector((state) => state.verify);

  const isRefresh = useSelector((state) => state.post);
  useEffect(() => {
    readDataPosts().then((snapshoot) => {
      snapshoot.forEach((item) => {
        if (!posts.find((newItem) => newItem.id === item.key)) {
          setPosts((prev) => prev.concat({ ...item.val(), id: item.key }));
        }
      });
    });
  }, [isRefresh, route.params]);

  return (
    <View style={styles.conteiner}>
      <View style={styles.profile_conteiner}>
        {userPhoto ? (
          <Image style={styles.image} source={{ uri: userPhoto }} />
        ) : (
          <View
            style={{
              backgroundColor: "#F6F6F6",
              borderRadius: 16,
              width: 60,
              height: 60,
            }}
          ></View>
        )}

        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostsItem navigation={navigation} item={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  profile_conteiner: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginBottom: 32,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
  name: {
    color: "#212121",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
  },
  email: {
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 13,
    lineHeight: 15,
  },
});
