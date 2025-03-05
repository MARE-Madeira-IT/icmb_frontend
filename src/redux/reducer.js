import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import application from "./redux-modules/application";
import message from "./redux-modules/message";
import chat from "./redux-modules/chat";
import calendar from "./redux-modules/calendar";
import networking from "./redux-modules/networking";
import user from "./redux-modules/user";
import sponsor from "./redux-modules/sponsor";
import speaker from "./redux-modules/speaker";
import resource from "./redux-modules/resource";

export const reducer = combineReducers({
    auth,
    application,
    message,
    chat,
    calendar,
    networking,
    user,
    sponsor,
    speaker,
    resource
});
