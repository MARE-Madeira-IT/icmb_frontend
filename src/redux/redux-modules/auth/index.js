import { types } from "./types";

const initialState = {
    data: [], //
    isAuthenticated: false,
    loading: false,
    user: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.CREATE_USER}_PENDING`:
        case `${types.LOGIN}_PENDING`:
        case `${types.LOGOUT}_PENDING`:
        case `${types.ME}_PENDING`:
        case `${types.UPDATE_PROFILE_PICTURE}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.CREATE_USER}_REJECTED`:
        case `${types.ME}_REJECTED`:
        case `${types.LOGIN}_REJECTED`:
        case `${types.LOGOUT}_REJECTED`:
        case `${types.UPDATE_PROFILE_PICTURE}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data, ...state.data],
            };

        case `${types.ME}_FULFILLED`:
        case `${types.LOGIN}_FULFILLED`:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case `${types.LOGOUT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        case `${types.LOGIN_SUCCESS}`:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.user,
            };
        case `${types.UPDATE_PROFILE_PICTURE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                user: action.payload.data.data,
            };

        default:
            return state;
    }
};
