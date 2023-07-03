import { Provider } from "react-redux";
import MainNavigator from "./src/routes/MainNavigator";
import { store } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <MainNavigator />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
