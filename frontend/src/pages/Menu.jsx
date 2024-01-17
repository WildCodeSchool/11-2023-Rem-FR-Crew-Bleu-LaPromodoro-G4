import { useState, React } from "react";
import { useLocation } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import Lapin from "../components/Lapin";
import Ours from "../components/Ours";
import Pig from "../components/Pig";
import Instructions from "../components/Instructions";
import MainNiveaux from "../components/MainNiveaux";

import "../style/Menu.css";

function Menu() {
  // On récupère le theme choisis par l'user

  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  console.info(`Mon theme choisi : ${userTheme.id}`);

  // bulle personnage

  const [dialogue, setDialogue] = useState(false);
  const changePopup = () => {
    setDialogue(!dialogue);
  };

  let backgroundComponent;

  if (userTheme.id === 1) {
    backgroundComponent = <Lapin />;
  } else if (userTheme.id === 2) {
    backgroundComponent = <Ours />;
  } else {
    backgroundComponent = <Pig />;
  }

  // Recupere l'username de l'Onboarding
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");

  return (
    <div className="mainContent">
      <div className="mainContainer">
        {backgroundComponent}
        <MainNiveaux />
        <Instructions />
      </div>
      <div className="dialogue-bulle">
        <button type="button" className="dialogue" onClick={changePopup}>
          ?
        </button>
        {dialogue && (
          <div className="popup-dialogue">
            <div className="triangle">.</div>
            <div className="dialogue-content">
              <p>
                <Typewriter
                  words={[
                    `Bonjour ${username} et bienvenue sur Gengo`,
                    `Choisi un niveau en appuyant sur 'Entrer'`,
                  ]}
                  loop={1}
                  typeSpeed={25}
                  delaySpeed={2000}
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
