import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadFromStorage } from "../utils";

const preloadedState = loadFromStorage();

export default createStore(rootReducer, preloadedState, applyMiddleware(thunk));
