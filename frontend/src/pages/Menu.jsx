import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

import Lapin from "../components/Lapin";
import Ours from "../components/Ours";
import Pig from "../components/Pig";
import Instructions from "../components/Instructions";
import MainNiveaux from "../components/MainNiveaux";
import Gauge from "../components/Gauge";

import "../style/Menu.css";

function Menu() {
  // On récupère le theme choisis par l'user

  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  console.info(`Mon theme choisi : ${userTheme.id}`);
  const [userName, setUserName] = useState("");
  // progress bar

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "";
    setUserName(storedUserName);
  }, []);
  let backgroundComponent;

  if (userTheme.id === 1) {
    backgroundComponent = <Lapin />;
  } else if (userTheme.id === 2) {
    backgroundComponent = <Ours />;
  } else {
    backgroundComponent = <Pig />;
  }

  // bulle personnage

  const [dialogue, setDialogue] = useState(false);
  const changePopup = () => {
    setDialogue(!dialogue);
  };
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
                    `Bonjour ${userName} et bienvenue sur Gengo`,
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
      <div className="gaugeplace">
        <div className="txt-gauge">
          <p>0</p>
          <p>100</p>
          <p>200</p>
          <p>300</p>
        </div>
        <Gauge />
      </div>
    </div>
  );
}

export default Menu;
