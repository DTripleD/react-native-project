import { Provider } from "react-redux";

import { Main } from "./srcc copy/Screens/Main";
import { store } from "./srcc copy/redux/store";

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
