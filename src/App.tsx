import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/layout/RootLayout";
import Guide from "@/pages/Guide";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

import Upload from "./pages/Upload";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "guide",
                element: <Guide />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "upload",
                element: <Upload />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
