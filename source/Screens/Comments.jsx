import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAddComment,
  fetchGetAllComments,
  fetchGetCommentsByUid,
} from "../Redux/comments/commentsOperations";
import { db } from "../Api/firebase";
import { useSelector } from "react-redux";
import {
  selectCommentsById,
  selectComments,
} from "../Redux/comments/commentsSelectors";
import { selectUserId, selectUserPhoto } from "../Redux/auth/authSelectors";
const img = require("../Source/Rectangle23.png");

const Comments = ({ navigation, route }) => {
  const { postId, postImg } = route.params;
  const allComments = useSelector(selectComments);
  const comments = allComments.filter((item) => item.postId === postId) || [];

  const uid = useSelector(selectUserId);

  const [postText, setPostText] = useState("");

  const userPhoto = useSelector(selectUserPhoto);

  const dispatch = useDispatch();

  const timeElapsed = Date.now();
  const date = new Date(timeElapsed);

  const dateConverted = date.toUTCString();

  const setComment = () => {
    if (postText) {
      dispatch(
        fetchAddComment({ postId, postText, uid, userPhoto, dateConverted })
      );
      setPostText("");
      return;
    }
    alert("Comment text is empty");
  };

  useEffect(() => {
    dispatch(fetchGetAllComments());
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.kav}
      keyboardVerticalOffset={90}
    >
      <View style={styles.postContainer}>
        <View style={styles.postBody}>
          <Image source={{ uri: `${postImg}` }} style={styles.mainImg} />
          <View style={styles.commentList}>
            <FlatList
              data={comments}
              // showsVerticalScrollIndicator={false}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item, id }) => (
                <View style={styles.commentsContainer}>
                  {item.uid !== uid ? (
                    <>
                      <View style={styles.userPhotoWrapper}>
                        <Image
                          source={{
                            uri: item.userPhoto
                              ? `${item.userPhoto}`
                              : "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57",
                          }}
                          style={styles.userPhotoComments}
                        />
                      </View>
                      <View style={styles.commentBodyAn}>
                        <Text>{item.postText}</Text>
                        <Text style={styles.commentText}>
                          {item.dateConverted}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.commentBody}>
                        <Text>{item.postText}</Text>
                        <Text style={styles.commentText}>
                          {item.dateConverted}
                        </Text>
                      </View>
                      <View style={styles.userPhotoWrapper}>
                        <Image
                          source={{
                            uri: item.userPhoto
                              ? `${item.userPhoto}`
                              : "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57",
                          }}
                          style={styles.userPhotoComments}
                        />
                      </View>
                    </>
                  )}
                </View>
              )}
            ></FlatList>
            <View style={styles.barStyle}>
              <TextInput
                style={styles.inputMailPassw}
                value={postText}
                onChangeText={(text) => {
                  setPostText(text);
                }}
                placeholder="Коментувати..."
              />
              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.5}
                onPress={setComment}
              >
                <Ionicons name="arrow-up-sharp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  commentList: {
    marginTop: 30,
    width: "90%",
    flex: 1,
    justifyContent: "center",
  },
  commentStyle: {
    width: "70%",
    backgroundColor: "#ff0",
  },
  postHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 80,
    width: "100%",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  postBody: {
    width: "100%",
    alignItems: "center",
    flex: 10,
    borderTopColor: "#E8E8E8",
    borderRadius: 50,
    borderTopWidth: 1,
  },
  commentBody: {
    minHeight: 60,
    backgroundColor: "#00000008",
    width: "80%",
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },
  commentBodyAn: {
    minHeight: 60,
    backgroundColor: "#00000008",
    width: "80%",
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
  },

  postImg: {
    flex: 3,
    width: "100%",
    height: 600,
    color: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  postImgAdd: {
    display: "flex",
    marginTop: -80,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
    borderColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  postImgText: {
    alignItems: "flex-start",
    color: "#fff",
  },
  postForm: {
    flex: 3,
  },
  postButton: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  postName: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
  mainImg: { width: 380, height: 280, borderRadius: 15, marginTop: 15 },
  commentsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  userPhotoComments: {
    width: 40,
    height: 40,
    borderRadius: 25,
    margin: 0,
    padding: 0,
  },
  commentText: {
    fontSize: 10,
    color: "#BDBDBD",
  },
  userPhotoWrapper: { borderRadius: 50 },
  addButton: {
    backgroundColor: "#FF6C00",
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: -43,
    left: 150,
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 50,
    borderRadius: 100,
    padding: 16,

    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  barStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
});

export default Comments;
