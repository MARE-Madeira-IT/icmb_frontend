import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import application from "./redux-modules/application";
import message from "./redux-modules/message";
import chat from "./redux-modules/chat";
import calendar from "./redux-modules/calendar";

export const reducer = combineReducers({
    auth,
    application,
    message,
    chat,
    calendar
});
