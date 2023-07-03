import React from "react";
import { Text, View } from "react-native";

const ErrorText = ({ text }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: text.length > 50 ? -15 : 1,
        left: 15,
      }}
    >
      <Text style={{ color: "red" }}>{text}</Text>
    </View>
  );
};

export { ErrorText };
