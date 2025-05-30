import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {
  loginSuccess,
  me,
  refreshAuthorizationToken,
  setAuthorizationToken,
} from "./redux/redux-modules/auth/actions.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
window.Pusher = Pusher;
Pusher.logToConsole = true;

axios.defaults.headers.common["ngrok-skip-browser-warning"] = 69420;

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
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
