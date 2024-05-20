import { Provider } from "react-redux";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { reducers } from "./reducers";
import React from "react";
const container = document.getElementById("root");
const root = createRoot(container);

const store = createStore(reducers, compose(applyMiddleware(thunk)));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider  
    clientId='1098235556765-q0effesj6f03kbqsp0skmhfmm9720tnl.apps.googleusercontent.com'>
      <React.StrictMode>
      <App />
    </React.StrictMode>,
    </GoogleOAuthProvider>
  </Provider>
);
