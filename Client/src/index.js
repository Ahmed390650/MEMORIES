import { Provider } from "react-redux";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import { createRoot } from "react-dom/client";

import { reducers } from "./reducers";
const container = document.getElementById("root");
const root = createRoot(container);

const store = createStore(reducers, compose(applyMiddleware(thunk)));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
