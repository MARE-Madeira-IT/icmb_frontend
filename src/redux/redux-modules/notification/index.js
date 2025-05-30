import { types } from "./types";

export const initialState = {
  data: [],
  meta: {},
  links: {},
  loading: false,
  current: {},
  counter: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.DELETE_NOTIFICATION}_PENDING`:
    case `${types.CREATE_NOTIFICATION}_PENDING`:
    case `${types.UPDATE_NOTIFICATION}_PENDING`:
    case `${types.FETCH_NOTIFICATIONS}_PENDING`:
    case `${types.FETCH_NOTIFICATION}_PENDING`:
      case `${types.COUNT_NOTIFICATIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.UPDATE_NOTIFICATION}_REJECTED`:
    case `${types.DELETE_NOTIFICATION}_REJECTED`:
    case `${types.CREATE_NOTIFICATION}_REJECTED`:
      case `${types.COUNT_NOTIFICATIONS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

      case `${types.COUNT_NOTIFICATIONS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        counter: action.payload.data,
      };


    case `${types.CREATE_NOTIFICATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [action.payload.data.data, ...state.data],
      };

    case `${types.DELETE_NOTIFICATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
      };

    case `${types.UPDATE_NOTIFICATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.map((record) =>
          record.id === action.payload.data.data.id
            ? action.payload.data.data
            : record
        ),
      };

    case `${types.FETCH_NOTIFICATION}_REJECTED`:
      return {
        ...state,
        loading: false,
        current: {},
      };
    case `${types.FETCH_NOTIFICATIONS}_REJECTED`:
      return {
        ...state,
        loading: false,
        data: [],
      };
    case `${types.FETCH_NOTIFICATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        current: action.payload.data.data,
      };

    case `${types.FETCH_NOTIFICATIONS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
      };

    default:
      return state;
  }
};
