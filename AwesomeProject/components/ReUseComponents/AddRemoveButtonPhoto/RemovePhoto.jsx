import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback, View } from "react-native";

const RemoveButtonPhoto = () => {
  const onClickRemove = () => {};
  return (
    <View style={{ position: "absolute", zIndex: 200, right: -14, bottom: 15 }}>
      <TouchableWithoutFeedback onPress={onClickRemove}>
        <Ionicons name="md-close-circle-outline" size={26} color="black" />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { RemoveButtonPhoto };
