import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import App from "./App";

import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Level from "./pages/Level";
import Speech from "./pages/Speech";
import Synonim from "./pages/Synonym";
import Quizz from "./pages/Quizz";
import Reward from "./pages/Reward";
// import motsbrouillées from "./pages/motsbrouillés";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/level",
        element: <Level />,
      },
      {
        path: "/speech",
        element: <Speech />,
      },
      {
        path: "/synonym",
        element: <Synonim />,
      },
      {
        path: "/quizz",
        element: <Quizz />,
      },
      {
        path: "/reward",
        element: <Reward />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
