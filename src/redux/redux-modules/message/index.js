import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    links: {},
    loading: false,
    current: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_MESSAGE}_PENDING`:
        case `${types.CREATE_MESSAGE}_PENDING`:
        case `${types.UPDATE_MESSAGE}_PENDING`:
        case `${types.FETCH_MESSAGES}_PENDING`:
        case `${types.FETCH_MESSAGE}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_MESSAGE}_REJECTED`:
        case `${types.DELETE_MESSAGE}_REJECTED`:
        case `${types.CREATE_MESSAGE}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_MESSAGE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.DELETE_MESSAGE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_MESSAGE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                )
            };

        case `${types.FETCH_MESSAGE}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };
        case `${types.FETCH_MESSAGES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };
        case `${types.FETCH_MESSAGE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_MESSAGES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
                links: action.payload.data.links
            };

        default:
            return state
    }
}