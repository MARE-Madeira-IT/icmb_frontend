import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
// import Echo from 'laravel-echo';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: "823c5f28ff80b7550228",
//     cluster: eu,
//     forceTLS: true
// });


window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "823c5f28ff80b7550228",
    cluster: "eu",
    encrypted: true
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />

        </Provider>
    </StrictMode>,
)
