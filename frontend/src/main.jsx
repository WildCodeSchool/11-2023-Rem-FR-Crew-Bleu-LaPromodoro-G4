import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import App from "./App";

import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Level from "./pages/Level";
import Speech from "./pages/Speech";
import Synonim from "./pages/Synonym";
import Quizz from "./pages/Quizz";
import Reward from "./pages/Reward";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Onboarding />,
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
