import { useState, React } from "react";

import Lapin from "../components/Lapin";
import Ours from "../components/Ours";
import Pig from "../components/Pig";

import Instructions from "../components/Instructions";

import MainNiveaux from "../components/MainNiveaux";

function Menu() {
  // On récupère le theme choisis par l'user

  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  console.info(`Mon theme choisi : ${userTheme.id}`);

  let backgroundComponent;

  if (userTheme.id === 1) {
    backgroundComponent = <Lapin />;
  } else if (userTheme.id === 2) {
    backgroundComponent = <Ours />;
  } else {
    backgroundComponent = <Pig />;
  }

  return (
    <>
      {/* Mettre une condition pour afficher le bon backgournd spline */}
      {backgroundComponent}
      <Instructions />
      <MainNiveaux />
    </>
  );
}

export default Menu;
