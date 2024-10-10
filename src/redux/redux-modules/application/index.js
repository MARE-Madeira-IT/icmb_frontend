import { types } from "./types";

export const initialState = {
    theme: "light",
    hasAction: false,
    hasClickedAction: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.SET_DARK_THEME}`:
        case `${types.SET_LIGHT_THEME}`:
            return {
                ...state,
                theme: action.payload,
            };

        case `${types.SET_HAS_ACTION}`:
            return {
                ...state,
                hasAction: action.payload,
            };

        case `${types.SET_HAS_CLICKED_ACTION}`:
            return {
                ...state,
                hasClickedAction: action.payload,
            };

        default:
            return state
    }
}