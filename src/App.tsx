import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/layout/RootLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

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
                path: "about",
                element: <About />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
