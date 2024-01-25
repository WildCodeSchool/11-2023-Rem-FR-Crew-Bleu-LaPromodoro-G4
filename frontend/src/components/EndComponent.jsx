import React, { useEffect, useState } from "react";
import "../style/EndComponent.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function EndComponent() {
  /// /Récupration des infos utilisateur dans le LocalStorage/////
  const userNameLocalStorage = localStorage.getItem("userName");
  const [userImage, setImagePath] = useState("");

  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  useEffect(() => {
    const userThemeLocalStorage = localStorage.getItem("userTheme");

    if (userThemeLocalStorage) {
      const userThemeObject = JSON.parse(userThemeLocalStorage);
      const path = userThemeObject.preview;

      setImagePath(path);
    }
  }, []);

  /// /Vider le LocalStorage////
  const clearLocalStorage = () => {
    localStorage.clear();
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
        className="slide-out1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out2"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="end-component">
        <img className="picture-user" src={userImage} alt="picture_user" />
        <h1>
          Félicitations {userNameLocalStorage} <br /> Tu as atteint les 40
          points !{" "}
        </h1>
        <div className="btns-restart">
          <Link to="/onboarding">
            <button type="button" className="btn-restart">
              Revenir au menu
            </button>
          </Link>
          <Link to="/onboarding">
            <button
              type="button"
              className="btn-restart"
              onClick={clearLocalStorage}
            >
              Nouvelle partie
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EndComponent;
