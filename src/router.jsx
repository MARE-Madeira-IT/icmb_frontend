import { createBrowserRouter, Router } from "react-router-dom";
import Template from "./Template";
import Homepage from "./pages/Homepage";
import Program from "./pages/Program";
import Chats from "./pages/Chats";
import Support from "./pages/Support";
import MessageBoard from "./pages/MessageBoard";
import Speakers from "./pages/Speakers";
import Speaker from "./pages/Speaker";
import Venue from "./pages/Venue";
import Sponsors from "./pages/Sponsors";
import Resources from "./pages/Resources";
import Voting from "./pages/Voting";
import PosterForm from "./pages/PosterForm";
import NetworkingRoom from "./pages/NetworkingRoom";
import AlertBoard from "./pages/AlertBoard";

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
                path: "/speaker/:id",
                element: <Speaker />,
            },
            {
                path: "/venue",
                element: <Venue />,
            },
            {
                path: "/sponsors",
                element: <Sponsors />,
            },
            {
                path: "/resources",
                element: <Resources />,
            },
            {
                path: "/voting",
                element: <Voting />,
            },
            {
                path: "/poster-voting",
                element: <PosterForm />,
            },
            {
                path: "/networking-room",
                element: <NetworkingRoom />,
            },
            {
                path: "/alert-board",
                element: <AlertBoard />,
            },
        ],
    },
]);