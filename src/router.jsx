import { createBrowserRouter } from "react-router-dom";
import Template from "./Template";
import Homepage from "./pages/Homepage";
import Program from "./pages/Program";
import Chats from "./pages/Chats";
import Support from "./pages/Support";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template><Homepage /></Template>,
        basemane: "home"
    },
    {
        path: "/program",
        element: <Template><Program /></Template>,
        basemane: "program"
    },
    {
        path: "/chats",
        element: <Template><Chats /></Template>,
        basemane: "home"
    },
    {
        path: "/support",
        element: <Template><Support /></Template>,
        basemane: "program"
    },
]);