import "../root.css";
import "./Onboarding.css";
import { useState, useEffect } from "react";

import themeImgDef from "../assets/themedef.png";
import themeImg1 from "../assets/theme1.png";
import themeImg2 from "../assets/theme2.png";
import themeImg3 from "../assets/theme3.png";

function Onboarding() {
  //  Initialisation des use state
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("selectedTheme")
  );

  //  Initialisation des use effect pour voir les changements en temps réel + stocker les infos dans le localstorage

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);
  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  // Fonction changement de nom en temps réel
  const handleNameChange = (event) => {
    const newUserName = event.target.value;
    setUserName(newUserName);

    const nextButton = document.getElementById("onboarding-btn-next");

    if (newUserName.trim() !== "") {
      nextButton.classList.add("btn-next-active");
    } else {
      nextButton.classList.remove("btn-next-active");
    }
  };

  // Fonction changement de theme et couleur de bouton au click sur le theme

  const elementStyle = [
    {
      theme: "default",
      color: "#b3b3b3",
      backgroundColor: "#f2f2f2",
      crs: "",
      preview: themeImgDef,
    },
    {
      theme: 1,
      color: "white",
      backgroundColor: "#f58fd8",
      crs: "pointer",
      preview: themeImg1,
    },
    {
      theme: 2,
      color: "white",
      backgroundColor: "#FF9E67",
      crs: "pointer",
      preview: themeImg2,
    },
    {
      theme: 3,
      color: "white",
      backgroundColor: "#49D9FF",
      crs: "pointer",
      preview: themeImg3,
    },
  ];

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const getButtonStyle = () => {
    switch (selectedTheme) {
      case "theme1":
        return elementStyle[1];
      case "theme2":
        return elementStyle[2];
      case "theme3":
        return elementStyle[3];
      default:
        return elementStyle[0];
    }
  };

  const buttonStyle = getButtonStyle();
  // TEST BUTTON COLOR UPDATE THEME

  return (
    <div className="onboarding-grid">
      <div className="onboarding-container">
        <div className="onboarding-wrapper">
          <div className="user-input">
            <h1>Crée ton profil</h1>
            <div className="input-div">
              <h2>Entre ton nom</h2>
              <input
                id=""
                name="Name"
                placeholder="Pop Simoké"
                type="text"
                value={userName}
                onChange={handleNameChange}
              />
            </div>
            <div className="input-div">
              <h2>Choisis un thème</h2>
              <div className="theme-selection">
                {/* Bouton THEME 1 */}
                <button
                  type="button"
                  className="theme-selection-button"
                  onClick={() => handleThemeChange("theme1")}
                >
                  <img src={themeImg1} alt="Theme1 button" />
                </button>
                {/* Bouton THEME 2 */}
                <button
                  type="button"
                  className="theme-selection-button"
                  onClick={() => handleThemeChange("theme2")}
                >
                  <img src={themeImg2} alt="Theme2 button" />
                </button>
                {/* Bouton THEME 3 */}
                <button
                  type="button"
                  className="theme-selection-button"
                  onClick={() => handleThemeChange("theme3")}
                >
                  <img src={themeImg3} alt="Theme3 button" />
                </button>
              </div>
            </div>
          </div>
          <div className="theme-card-preview">
            <img src={buttonStyle.preview} alt="" />
            <h3>{userName || ""}</h3>
          </div>
        </div>
        <button
          id="onboarding-btn-next"
          type="button"
          className="onboarding-btn-next"
          style={{
            color: buttonStyle.color,
            backgroundColor: buttonStyle.backgroundColor,
            cursor: buttonStyle.crs,
          }}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
