import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { updatePost, readComment, readStarCount } from "../../../FireBase";
import { isUpdate, updateOff } from "../../../redux/post/postSlice";

const PostsItem = ({
  navigation,
  item: { photo, id, location, info, comment, starCount },
}) => {
  // comment and likes
  const [countComments, setCountComments] = useState(0);
  const [countLikes, setCountLikes] = useState(0);
  // width
  const [width, setwidth] = useState(Dimensions.get("screen").width - 32);
  // hooks
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.verify);
  const isRefresh = useSelector((state) => state.post);

  //
  const handleUploadLikes = () => {
    updatePost(id, userId);
    dispatch(isUpdate());
  };

  useEffect(() => {
    readStarCount(id).then(({ size }) => setCountLikes(size));
    readComment(id).then(({ size }) => setCountComments(size));
  }, [isRefresh]);

  return (
    <View style={{ marginVertical: 16 }}>
      <ImageBackground
        style={{ ...styles.conteiner_img_post, width }}
        borderRadius={8}
        source={{ uri: photo }}
      ></ImageBackground>
      <Text style={styles.text_title}>{info.title}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          marginTop: 8,
        }}
      >
        <View style={styles.like_conteiner}>
          <Feather
            name="message-circle"
            size={21}
            color="#FF6C00"
            style={{ marginRight: 7 }}
            onPress={() =>
              navigation.navigate("Comment", { id, photo, comment })
            }
          />
          <Text style={styles.count_comment}>{countComments}</Text>
        </View>
        <View style={styles.comment_conteiner}>
          <Feather
            style={{ marginRight: 7 }}
            name="thumbs-up"
            size={18}
            color="#FF6C00"
            onPress={handleUploadLikes}
          />
          <Text style={styles.count_comment}>{countLikes}</Text>
        </View>
        <View style={styles.location_conteiner}>
          <Feather
            style={{}}
            name="map-pin"
            size={18}
            color="#BDBDBD"
            onPress={() => navigation.navigate("Map", location)}
          />
          <Text style={{ marginLeft: 8, color: "#212121", fontSize: 16 }}>
            {info.location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export { PostsItem };

const styles = StyleSheet.create({
  conteiner_img_post: {
    marginBottom: 8,
    width: 343,
    height: 250,
  },
  text_title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginRight: "auto",
  },
  comment_conteiner: {
    flexDirection: "row",
  },
  like_conteiner: {
    flexDirection: "row",
  },
  count_comment: {
    fontSize: 15,
    color: "#212121",
    marginRight: 29,
  },
  location_conteiner: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
});
