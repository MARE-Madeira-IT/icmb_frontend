import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {
  loginSuccess,
  me,
  refreshAuthorizationToken,
  setAuthorizationToken,
} from "./redux/redux-modules/auth/actions.js";
import { jwtDecode } from "jwt-decode";

window.Pusher = Pusher;
Pusher.logToConsole = true;

if (localStorage.token) {
  const token = jwtDecode(localStorage.token);
  const tokenExp = token.exp < Date.now() / 1000;

  if (tokenExp) {
    store.dispatch(refreshAuthorizationToken(localStorage.token));
  } else {
    store.dispatch(loginSuccess());

    setAuthorizationToken(localStorage.token);
    store.dispatch(me());
  }
}

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: "eu",
  encrypted: true,
  authEndpoint: import.meta.env.VITE_API_URL + "/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ` + localStorage.token,
      Accept: "application/json",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
