import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { saveState } from "./utils/index";
import "./index.css";

store.subscribe(() => {
  saveState({ fav: store.getState().fav, movies: store.getState().movies });
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
