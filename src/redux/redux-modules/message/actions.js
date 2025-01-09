import { types } from "./types";
import axios from "axios";
import queryString from "query-string";
const url = "http://localhost:8000";

export const fetchMessages = (page = 1, filters = {}) => ({
    type: types.FETCH_MESSAGES,
    payload: axios.get(`${url}/api/messages?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchMessage = (id) => ({
    type: types.FETCH_MESSAGE,
    payload: axios.get(`${window.location.origin}/api/messages/${id}`)
})

export const deleteMessage = id => ({
    type: types.DELETE_MESSAGE,
    payload: axios.delete(`${window.location.origin}/api/messages/${id}`),
    meta: { id }
});

export const createMessage = (data) => ({
    type: types.CREATE_MESSAGE,
    payload: axios.post(`${url}/api/messages`, data),
});


export const updateMessage = (id, data) => ({
    type: types.UPDATE_MESSAGE,
    payload: axios.put(`${window.location.origin}/api/messages/${id}`, data),
});


