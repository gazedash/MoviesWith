import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { saveState } from "./utils/index";
import "./index.css";
import { favMoviesSelector } from "./store/selectors/index";

store.subscribe(() => {
  saveState({ fav: store.getState().fav, movies: favMoviesSelector(store.getState()) });
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
