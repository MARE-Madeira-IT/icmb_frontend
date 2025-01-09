import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import application from "./redux-modules/application";
import message from "./redux-modules/message";


export const reducer = combineReducers({
    auth,
    application,
    message
});
