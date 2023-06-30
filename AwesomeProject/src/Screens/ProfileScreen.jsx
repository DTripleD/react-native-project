import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../images/bg-photo.png")}
      style={styles.backImg}
    >
      {/* <ScrollView> */}
      <View style={styles.form}>
        <View style={styles.photoContainer}>
          <Image
            source={require("../images/user.png")}
            style={{ height: "100%", width: "100%" }}
          />
          <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
            <Ionicons name="add-circle-outline" size={25} color="#FF6C00" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Natali Romanova</Text>

        <ScrollView>
          <View style={styles.postContainer}>
            <Image
              source={require("../images/postImage.png")}
              style={styles.postPhoto}
            />
            <Text style={styles.postTitle}>Ліс</Text>
            <View style={styles.locationWrapper}>
              <TouchableOpacity
                style={styles.locationInfo}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("CommentsScreen", {
                    photo: "../images/postImage.png",
                  })
                }
              >
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.locationInfo}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    photo: "../images/postImage.png",
                  })
                }
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text style={styles.location}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.postContainer}>
            <Image
              source={require("../images/postImage.png")}
              style={styles.postPhoto}
            />
            <Text style={styles.postTitle}>Ліс</Text>
            <View style={styles.locationWrapper}>
              <TouchableOpacity
                style={styles.locationInfo}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("CommentsScreen", {
                    photo: "../images/postImage.png",
                  })
                }
              >
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.locationInfo}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    photo: "../images/postImage.png",
                  })
                }
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text style={styles.location}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* </ScrollView> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "",
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  photoContainer: {
    marginTop: -90,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addbutton: {
    marginTop: "-35%",
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },

  backImg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "flex-end",
  },
  form: {
    // position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // marginBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
    height: "80%",
  },

  postPhoto: { borderRadius: 8 },
  postTitle: { fontWeight: 500, fontSize: 16, color: "#212121", marginTop: 8 },
  locationWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 8,
  },
  locationInfo: { flexDirection: "row" },
  commentsCount: {
    fontWeight: 400,
    fontSize: 16,
    color: "#BDBDBD",
  },
  location: {
    fontWeight: 400,
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
  postContainer: { marginTop: 32 },
});

export default Profile;
