import { applyMiddleware, createStore, compose } from "redux";
import { reducer } from "./reducer";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, promise))
);