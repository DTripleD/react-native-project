import React from "react";
import { useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback, View } from "react-native";

import { getImageFromGallery } from "../../../services";
import { uploadPhonoInStorage } from "../../../../FireBase";
import { authUpdateProfile } from "../../../redux/auth/authoperations";

const AddButtonPhoto = ({ setImage }) => {
  const dispatch = useDispatch();
  const onClickAdd = async () => {
    const refPhoto = await uploadPhonoInStorage(await getImageFromGallery());
    setImage(refPhoto);
    dispatch(authUpdateProfile(refPhoto));
  };
  return (
    <View style={{ position: "absolute", zIndex: 200, right: -14, bottom: 15 }}>
      <TouchableWithoutFeedback onPress={onClickAdd}>
        <Ionicons
          style={{ color: "#FF6C00" }}
          name="ios-add-circle-outline"
          size={26}
          color="black"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { AddButtonPhoto };
