import React from "react";

import StackNav from "./StackNav";
import MainTabsNav from "./MainTabsNav";

const useRouting = (isAuth) => {
  return isAuth ? <MainTabsNav /> : <StackNav />;
};

export { useRouting };
