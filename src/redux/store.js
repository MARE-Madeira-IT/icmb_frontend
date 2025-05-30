import { applyMiddleware, createStore, compose } from "redux";
import { reducer } from "./reducer";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, promise))
);

export const persistor = persistStore(store);
