import { createRoot } from "react-dom/client";
import App from "@features/App";
import store from "@data/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
