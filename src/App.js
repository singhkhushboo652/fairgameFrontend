import "./App.css";
import Main from "./main";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./newStore";
import { SocketProvider } from "./context/socketContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <ToastContainer />
            <div className="App">
              <Main />
            </div>
          </SocketProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
