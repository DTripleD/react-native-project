import React from "react";

import { TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const TabHeaderNavBack = ({ navigation }) => {
  return (
    <View
      style={{
        paddingLeft: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export { TabHeaderNavBack };
