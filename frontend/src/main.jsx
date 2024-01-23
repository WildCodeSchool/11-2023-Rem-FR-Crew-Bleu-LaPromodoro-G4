import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import App from "./App";

import Onboarding from "./pages/Onboarding";
import Menu from "./pages/Menu";
import Level from "./pages/Level";
import Speech from "./pages/Speech";
import WordSynonymComponent from "./components/WordSynonymComponent";
import Quizz from "./pages/Quizz";
import Reward from "./pages/Reward";
import JeuOrdreLettres from "./pages/JeuOrdreLettres";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Onboarding />,
      },
      {
        path: "/menu",
        element: <Menu />,
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
        element: <WordSynonymComponent />,
      },
      {
        path: "/quizz",
        element: <Quizz />,
      },
      {
        path: "/reward",
        element: <Reward />,
      },
      {
        path: "/JeuOrdreLettres",
        element: <JeuOrdreLettres />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
