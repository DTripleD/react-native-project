import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Post from "../Elements/Post";
import { fetchGetAllPosts } from "../Redux/posts/postsOperations";
import Map from "./Map";
import PostList from "./PostList";

const PostNavigation = createStackNavigator();

const NavigationPosts = () => {
  return (
    <PostNavigation.Navigator
      initialRouteName="PostList"
      screenOptions={{ headerShown: false }}
    >
      <PostNavigation.Screen name="Post" component={Post} />
      <PostNavigation.Screen name="PostList" component={PostList} />
      <PostNavigation.Screen name="Map" component={Map} />
    </PostNavigation.Navigator>
  );
};

export default NavigationPosts;
