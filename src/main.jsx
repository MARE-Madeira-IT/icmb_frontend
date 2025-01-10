import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { loginSuccess, me, refreshAuthorizationToken, setAuthorizationToken } from './redux/redux-modules/auth/actions.js'
import { jwtDecode } from 'jwt-decode'


// const options = {
//     broadcaster: 'pusher',
//     key: "823c5f28ff80b7550228",
//     cluster: "eu",
//     forceTLS: "https",  //authEndpoint is your apiUrl + /broadcasting/auth
//     authEndpoint: "http://localhost:8000/channels/chat",   // As I'm using JWT tokens, I need to manually set up the headers.
//     auth: {
//         headers: {
//             Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM2MzQ3NzA2LCJleHAiOjE3MzYzNTEzMDYsIm5iZiI6MTczNjM0NzcwNiwianRpIjoibkVxM3BrM0JsaEdEQ1ZTaiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.oBPuKp9VtG3pO4FTEHGRnwGhOGYRMUZfF3u1amyZRIw`,
//             Accept: 'application/json',
//         },
//     },
// };
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




createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />

        </Provider>
    </StrictMode>,
)
