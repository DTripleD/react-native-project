import { useRoute } from "@react-navigation/native";
import { Button, Pressable, TouchableOpacity } from "react-native";
import { ScrollView, TextInput, View } from "react-native";
import { Image, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/postImage.png")}
        style={styles.postPhoto}
      />
      <ScrollView>
        <View style={styles.comment}>
          <Image
            source={require("../images/user2.png")}
            style={styles.commentPhoto}
          />
          <View style={styles.commentTextContainer}>
            <Text style={styles.commentText}>
              Really love your most recent photo. I’ve been trying to capture
              the same thing for a few months and would love some tips!
            </Text>
            <Text style={styles.commentData}>09 червня, 2020 | 08:40</Text>
          </View>
        </View>
        <View style={styles.comment}>
          <View style={styles.commentTextContainer}>
            <Text style={styles.commentText}>
              A fast 50mm like f1.8 would help with the bokeh. I’ve been using
              primes as they tend to get a bit sharper images.
            </Text>
            <Text style={styles.commentData}>09 червня, 2020 | 09:14</Text>
          </View>
          <Image
            source={require("../images/user.png")}
            style={styles.commentPhoto}
          />
        </View>
        <View style={styles.comment}>
          <Image
            source={require("../images/user2.png")}
            style={styles.commentPhoto}
          />
          <View style={styles.commentTextContainer}>
            <Text style={styles.commentText}>
              Thank you! That was very helpful!
            </Text>
            <Text style={styles.commentData}>09 червня, 2020 | 09:20</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#E8E8E8",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <TextInput
          placeholder="Коментувати..."
          style={{ padding: 16, fontSize: 16 }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "center",
            right: 0,
            padding: 8,
          }}
        >
          <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },
  postPhoto: { width: "100%", borderRadius: 8, marginBottom: 32 },
  commentTextContainer: {
    backgroundColor: "#00000008",
    padding: 16,
    flex: 1,
    borderRadius: 8,
  },
  commentData: {
    color: "#BDBDBD",
    fontWeight: 400,
    fontSize: 10,
    textAlign: "right",
    marginTop: 8,
  },
  commentText: {
    color: "#212121",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
  },
  comment: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 24,
    gap: 16,
  },
  commentPhoto: { width: 28, height: 28, borderRadius: 50 },
});

export default CommentsScreen;
