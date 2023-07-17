import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../../firebase/config";
import {
  doc,
  collection,
  getCountFromServer,
  onSnapshot,
  setDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { ModalLikes, ModalPhoto } from "../Others/Modal";
import { deletePost } from "../../utils/delete";
import { useSelector } from "react-redux";
import {
  selectStateUserId,
  selectStateLogin,
  selectStateAvatar,
} from "../../redux/selectors";

export const ProfilePost = ({ post, navigation, route }) => {
  const [countComments, setCountComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [likesInfo, setLikesInfo] = useState([]);
  const [active, setActive] = useState(false);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [modalLikes, setModalLikes] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const userId = useSelector(selectStateUserId);
  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);

  const handleLike = () => {
    setLikes(likes + 1);
    setNumberOfClicks(1);
    sendLike();
    if (numberOfClicks === 1) {
      setLikes(likes - 1);
      setNumberOfClicks(0);
      deleteLike();
    }
  };

  const sendLike = async () => {
    try {
      const postRef = doc(db, "posts", post.id, "likes", login);

      await setDoc(postRef, {
        owner: {
          login,
          avatar,
          userId,
        },
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      dispatch(addLike(likes));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLike = async () => {
    try {
      const documentRef = doc(db, "posts", post.id, "likes", login);
      await deleteDoc(documentRef);
      console.log("The document was successfully deleted.");
    } catch (error) {
      console.error("Error when deleting the document:", error);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const commentsRef = collection(db, "posts", post.id, "comments");
        const likesRef = collection(db, "posts", post.id, "likes");

        const commentsSnapshot = await getCountFromServer(commentsRef);
        const likesSnapshot = await getCountFromServer(likesRef);

        setCountComments(commentsSnapshot.data().count);
        setLikes(likesSnapshot.data().count);
      };

      fetchData();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [post]);

  useEffect(() => {
    const dbRef = collection(db, "posts", post.id, "likes");

    onSnapshot(
      dbRef,
      (data) => {
        const likes = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const reversLikes = likes.reverse();
        setLikesInfo(reversLikes);
      },
      () => {}
    );
  }, [likes]);

  const selectTitleLocation = ({ location }) => {
    if (location.title) {
      return location.title;
    }

    if (location.postAddress) {
      return `${location.postAddress?.city}, ${location.postAddress?.street}`;
    }

    return "Дефолтна локація";
  };
  if (modalLikes && likes !== 0) {
    return (
      <ModalLikes
        title="Вподобайки"
        likes={likesInfo}
        modalLikes={modalLikes}
        setModalLikes={setModalLikes}
      />
    );
  }
  if (modalPhoto) {
    return (
      <ModalPhoto
        photo={post.photo}
        modalPhoto={modalPhoto}
        setModalPhoto={setModalPhoto}
      />
    );
  }

  return (
    <View style={styles.postWrp}>
      <TouchableOpacity onPress={() => setModalPhoto(true)}>
        <Image style={styles.photo} source={{ uri: post.photo }} />
      </TouchableOpacity>

      <Ionicons
        name="trash-outline"
        size={25}
        color="#fff"
        style={{
          position: "absolute",
          top: 7,
          right: 10,
        }}
        onPress={() => {
          deletePost(post.id);
        }}
      />
      <View style={styles.bottomInfo}>
        <View style={styles.marginLeft}>
          <Text style={styles.titlePost}>{post.titlePost}</Text>

          <View style={styles.buttonsWrp}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonComments}
                onPress={() => navigation.navigate("Comments", post)}
              >
                <View style={styles.commentsIcon}>
                  <Feather
                    name="message-circle"
                    size={24}
                    color={countComments > 0 ? "#A696C8" : "#BDBDBD"}
                  />
                </View>
                <Text style={styles.commentsCount}>{countComments}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonComments}
                onPress={() => setModalLikes(true)}
              >
                <View style={styles.mapIcon}>
                  <Ionicons
                    name="heart"
                    size={25}
                    color={likes > 0 ? "#F5A7A7" : "#BDBDBD"}
                    onPress={handleLike}
                  />
                </View>
                <Text style={styles.commentsCount}>{likes}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonLocation}
                onPress={() => {
                  navigation.navigate("Map", post);
                }}
              >
                <View style={styles.mapIcon}>
                  <Ionicons
                    name="navigate"
                    size={20}
                    onPress={() => setActive(true)}
                    color={active ? "#DBE9B7" : "#BDBDBD"}
                  />
                </View>
                <Text
                  style={styles.mapTitle}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {selectTitleLocation(post)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrp: {
    marginBottom: 30,
  },
  marginLeft: {
    marginLeft: 10,
  },
  photo: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    width: 330,
    height: 240,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  bottomInfo: {
    flexDirection: "row",
  },
  owner: {
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "lightgrey",
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  titlePost: {
    marginBottom: 5,
    maxWidth: 100,

    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  buttonsWrp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
  },
  buttonComments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsIcon: {
    marginRight: 10,
    transform: [{ rotate: "-90deg" }],
    fill: "#BDBDBD",
  },
  commentsCount: {
    fontSize: 16,
  },
  buttonLocation: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mapIcon: {
    marginRight: 10,
    // fill: "#BDBDBD",
  },
  mapTitle: {
    maxWidth: 100,

    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "#212121",
  },
});
