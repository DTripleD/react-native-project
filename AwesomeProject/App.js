import { Provider } from "react-redux";

import { Main } from "./src/Screens/Main";
import { store } from "./src/redux/store";

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
