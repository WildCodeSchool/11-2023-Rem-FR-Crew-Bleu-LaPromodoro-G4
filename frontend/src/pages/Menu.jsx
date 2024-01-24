/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Lapin from "../components/Lapin";
import Ours from "../components/Ours";
import Pig from "../components/Pig";
import Instructions from "../components/Instructions";
import MainNiveaux from "../components/MainNiveaux";
import Gauge from "../components/Gauge";

import "../style/Menu.css";

function Menu() {
  // On récupère le theme choisis par l'user

  const isUnlocked = (level) => {
    const scoreTotal = parseInt(localStorage.getItem("scoreTotal"), 10) || 0;
    const levelScores = { 1: 0, 2: 10, 3: 20, 4: 30 };
    return scoreTotal >= levelScores[level];
  };

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
    <>
      <motion.div
        className="slide-in1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-in2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        initial={{
          scale: 1,
        }}
        animate={{
          scale: 10,
          transition: { delay: 2, duration: 3, ease: [0.22, 1, 0.36, 1] },
        }}
        className="clipped-bg"
      />
      <motion.div
        initial={{
          opacity: 0,
          scale: 2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            opacity: { delay: 1, duration: 0.5 },
            scale: { delay: 2, duration: 3, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="mainContent"
      >
        <div className="mainContainer">
          {backgroundComponent}
          <MainNiveaux isUnlocked={isUnlocked} />
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
            <p>10</p>
            <p>20</p>
            <p>30</p>
            <p>40</p>
          </div>
          <Gauge />
        </div>
      </motion.div>
    </>
  );
}

export default Menu;
