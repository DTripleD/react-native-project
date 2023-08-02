import { View, StyleSheet, ImageBackground, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/auth/authSelectors";
const avatar = require("../Source/Rectangle22.png");

const ProfileElement = () => {
  const { user, name, photo } = useSelector(selectUser);

  return (
    <View style={styles.profContainer}>
      <Image
        source={{
          uri: `${
            photo === null
              ? "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57"
              : photo
          }`,
        }}
        style={styles.profImg}
      ></Image>
      <View style={styles.profInfo}>
        <Text style={styles.profName}>{name}</Text>
        <Text>{user}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 32,
    marginBottom: 20,
    marginLeft: 20,
  },
  profImg: {
    borderRadius: 15,
    width: 60,
    height: 60,
  },
  profInfo: {
    justifyContent: "center",
    marginLeft: 20,
  },
  profName: {
    fontWeight: "700",
  },
});

export default ProfileElement;
