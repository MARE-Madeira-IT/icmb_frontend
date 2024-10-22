import { createBrowserRouter, Router } from "react-router-dom";
import Template from "./Template";
import Homepage from "./pages/Homepage";
import Program from "./pages/Program";
import Chats from "./pages/Chats";
import Support from "./pages/Support";
import MessageBoard from "./pages/MessageBoard";
import Speakers from "./pages/Speakers";
import Speaker from "./Speaker";

export const router = createBrowserRouter([
    {
        element: <Template />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/program",
                element: <Program />,
            },
            {
                path: "/chats",
                element: <Chats />,
            },
            {
                path: "/support",
                element: <Support />,
            },
            {
                path: "/message-board",
                element: <MessageBoard />,
            },
            {
                path: "/speakers",
                element: <Speakers />,
            },
            {
                path: "/speakers/:id",
                element: <Speaker />,
            },
        ],
    },
]);