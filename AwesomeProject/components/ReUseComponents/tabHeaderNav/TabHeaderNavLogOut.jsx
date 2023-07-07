import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

const TabHederLogOut = ({ onLogOut }) => {
  return (
    <View
      style={{
        paddingRight: 20,
      }}
    >
      <TouchableOpacity onPress={onLogOut}>
        <Feather name="log-out" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export { TabHederLogOut };
