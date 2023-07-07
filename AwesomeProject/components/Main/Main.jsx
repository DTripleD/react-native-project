import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { useRouting } from "../../routers/router";
import { authStateChanged } from "../../redux/auth/authOperations";

const Main = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.verify.token);

  const routing = useRouting(state);

  console.log(state);
  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export { Main };
