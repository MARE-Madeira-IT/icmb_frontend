import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import application from "./redux-modules/application";


export const reducer = combineReducers({
    auth,
    application
});
