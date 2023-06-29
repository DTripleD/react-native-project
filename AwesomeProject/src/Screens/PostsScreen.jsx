import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          source={require("../images/user.png")}
          style={styles.userImage}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

      <View style={styles.postContainer}>
        <Image
          source={require("../images/postImage.png")}
          style={styles.postPhoto}
        />
        <Text style={styles.postTitle}>Ліс</Text>
        <View style={styles.locationWrapper}>
          <View style={styles.locationInfo}>
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
            <Text style={styles.commentsCount}>0</Text>
          </View>
          <View style={styles.locationInfo}>
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
            <Text style={styles.location}>
              Ivano-Frankivs'k Region, Ukraine
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
    color: "#212121",
  },
  email: { fontWeight: 400, fontSize: 11, color: "#212121CC" },
  textWrapper: { marginLeft: 8 },
  userImage: { width: 60, height: 60 },
  location: {
    fontWeight: 400,
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
  postTitle: { fontWeight: 500, fontSize: 16, color: "#212121", marginTop: 8 },
  locationInfo: { flexDirection: "row" },
  commentsCount: {
    fontWeight: 400,
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 8,
  },
  postPhoto: { width: "100%", borderRadius: 8 },
  postContainer: { marginTop: 32 },
});
