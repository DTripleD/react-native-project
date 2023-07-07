import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// icons
import { AntDesign } from "@expo/vector-icons";

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { readComment, uploadComment } from "../../FireBase/fireBaseDB";
import { isUpdate } from "../../redux/post/postSlice";

const CommentsScreen = ({ route }) => {
  const [widht, setWidht] = useState(Dimensions.get("window").width);
  const [comment, setComment] = useState("");
  const [dataComment, setDataComment] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [prevId, setPrevId] = useState(id);
  // hooks
  const {
    name,
    photo: userPhoto,
    userId,
  } = useSelector((state) => state.verify);
  const dispatch = useDispatch();
  //

  const { id, photo } = route.params;

  const handleCreateComment = () => {
    const date = new Date();
    dispatch(isUpdate());

    uploadComment(comment, name, id, date.toLocaleString(), userPhoto, userId);
    setRefresh((prev) => !prev);
    setComment("");
  };

  useEffect(() => {
    if (id !== prevId) {
      setPrevId(id);
      setDataComment([]);
    }
    readComment(id).then((snapshot) => {
      snapshot.forEach((item) => {
        console.log(item);
        if (!dataComment.find((newItem) => newItem.id === item.key)) {
          setDataComment((prev) =>
            prev.concat({ user: item.val(), id: item.key })
          );
        }
      });
    });
  }, [refresh, route.params]);

  return (
    <View style={styles.conteiner}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Image style={styles.image_posts} source={{ uri: photo }} />
        }
        ListHeaderComponentStyle={{
          borderRadius: 8,
          marginBottom: 32,
        }}
        data={dataComment}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 32,
              flexDirection: item.user.name === name ? "row-reverse" : "row",
            }}
          >
            <Image
              source={{ uri: item.user.photo }}
              style={{
                ...styles.user_photo,
                marginLeft: item.user.name === name ? 10 : 0,
                marginRight: item.user.name === name ? 0 : 10,
              }}
            />
            <View style={styles.post}>
              {item.user.name !== name && (
                <Text style={styles.user_name}>{item.user.name}</Text>
              )}
              <Text style={{ ...styles.post_message, width: widht - 100 }}>
                {item.user.comment}
              </Text>
              <Text
                style={{
                  ...styles.post_time,
                  marginRight: item.user.name === name ? "auto" : 0,
                  marginLeft: item.user.name === name ? 0 : "auto",
                }}
              >
                {item.user.date}
              </Text>
            </View>
          </View>
        )}
      ></FlatList>
      <View style={styles.create_comment}>
        <TouchableOpacity
          style={styles.button_post}
          onPress={handleCreateComment}
        >
          <AntDesign name="arrowup" size={24} color="#fff" />
        </TouchableOpacity>

        <TextInput
          value={comment}
          onChangeText={(value) => setComment(value)}
          style={styles.input}
          placeholder="Comments"
        />
      </View>
    </View>
  );
};

export default CommentsScreen;

const WIDTH = Dimensions.get("window").width - 32;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  image_posts: {
    width: WIDTH,
    height: 250,
    borderRadius: 6,
  },
  post: {
    padding: 16,
    backgroundColor: "rgba(189, 189, 189, 0.3)",
    borderRadius: 6,
    borderTopLeftRadius: 0,
  },
  post_message: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  post_time: {
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  user_photo: {
    position: "relative",

    width: 28,
    height: 28,
    borderRadius: 50,
  },
  user_name: {
    position: "absolute",
    color: "blue",
    fontWeight: "500",
    top: -3,
    left: 4,
  },
  create_comment: {
    position: "relative",
    marginTop: 5,
  },
  input: {
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
  },
  button_post: {
    position: "absolute",
    right: 10,
    top: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,

    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
