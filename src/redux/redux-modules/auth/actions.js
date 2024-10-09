import { types } from "./types";
import api from "../api/auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = `${import.meta.env.VITE_API}/api`;

export const createUser = (data) => ({
  type: types.CREATE_USER,
  payload: api.createUser(data),
});

export const login = (data) => {
  return (dispatch) => {
    return axios.post(`${url}/login`, data).then((res) => {
      const token = res.data.data.access_token;
      localStorage.setItem("token", token);
      setAuthorizationToken(token);
      dispatch(loginSuccess(jwtDecode(token), res.data.user));
    });
  };
};

export const me = () => ({
  type: types.ME,
  payload: axios.get(`${url}/me`),
});

export function loginSuccess(token, user) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: token,
    user: user,
  };
}

export const logout = () => {
  return (dispatch) => {
    const response = dispatch({
      type: types.LOGOUT,
      payload: axios.get(`${url}/logout`),
    });
    response.then((res) => {
      resetToken();
    });
  };
};

export function refreshAuthorizationToken(token) {
  return (dispatch) => {
    return axios
      .get({
        url: `${url}/refresh`,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const token = res.data.data.access_token;
        localStorage.setItem("token", token);
        setAuthorizationToken(token);
        dispatch(loginSuccess(jwtDecode(token)));
      })
      .catch((err) => {
        resetToken();
      });
  };
}
export function setAuthorizationToken(token) {
  token
    ? (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
    : delete axios.defaults.headers.common["Authorization"];
}

export function resetToken() {
  localStorage.removeItem("token");
  setAuthorizationToken(false);
}

export const updateProfilePicture = (id, data) => ({
  type: types.UPDATE_PROFILE_PICTURE,
  payload: api.updateProfilePicture(id, data),
  meta: { globalError: true },
});
