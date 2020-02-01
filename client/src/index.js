import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { startLoginOnAppStartup } from "./actions/auth";
import reducers from "./reducers";

import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import AppRouter from "./routes/AppRouter";

// create store with middleware
const store = applyMiddleware(thunk)(createStore)(reducers);

// TODO: Make use of a single Modal everywhere -> dashboard page remaining (Calendar modal & Notes Modal)
// TODO: add PropTypes everywhere!
// TODO: Connection checking and timeout for fetching, etc.

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root"),
);

process.env.NODE_ENV === "production" ? serviceWorker.register() : serviceWorker.unregister();

(() => {
  store.dispatch(startLoginOnAppStartup());
})();
