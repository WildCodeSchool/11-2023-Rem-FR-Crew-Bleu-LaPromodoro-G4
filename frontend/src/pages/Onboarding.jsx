import "../root.css";
import "./Onboarding.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import themeImgDef from "../assets/themedef.png";
import themeImg1 from "../assets/theme1.png";
import themeImg2 from "../assets/theme2.png";
import themeImg3 from "../assets/theme3.png";

const elementStyle = [
  {
    id: "default",
    color: "#b3b3b3",
    backgroundColor: "#f2f2f2",
    crs: "",
    preview: themeImgDef,
  },
  {
    id: 1,
    color: "white",
    backgroundColor: "#f58fd8",
    crs: "pointer",
    preview: themeImg1,
  },
  {
    id: 2,
    color: "white",
    backgroundColor: "#FF9E67",
    crs: "pointer",
    preview: themeImg2,
  },
  {
    id: 3,
    color: "white",
    backgroundColor: "#49D9FF",
    crs: "pointer",
    preview: themeImg3,
  },
];

function Onboarding() {
  // Local storage stuff
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("selectedTheme") || ""
  );
  const [userTheme, setUserTheme] = useState(
    JSON.parse(localStorage.getItem("userTheme")) || ""
  );
  // console.log('poueltltellteltle',JSON.parse(localStorage.getItem("userTheme")) , elementStyle[0])
  // Setup le theme du site pour pouvoir le stocker dans le local storage
  // tableau element Style pour stocker mes données des différents themes

  const getThemeStyle = () => {
    switch (selectedTheme) {
      case "theme1":
        return elementStyle[1];
      case "theme2":
        return elementStyle[2];
      case "theme3":
        return elementStyle[3];
      default:
        return JSON.parse(localStorage.getItem("userTheme")) || elementStyle[0];
    }
  };
  // Pour récuperer le userName sur la preview + activé les boutons themes en couleurs
  const handleNameChange = (event) => {
    const newUserName = event.target.value;
    setUserName(newUserName);
  };

  // Au click sur un bouton theme, ça va mettre à jour le bouton suivant + image de preview
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  // Bouton pour stocker les infos de l'user (Name + Theme)
  const storeDataNext = () => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userTheme", JSON.stringify(userTheme));
  };

  // USE EFFECT STYLE

  useEffect(() => {
    setUserTheme(getThemeStyle());
  }, [selectedTheme]);

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
                <button
                  type="button"
                  className="theme-selection-button"
                  onClick={() => handleThemeChange("theme1")}
                >
                  <img
                    id="theme-btn-1"
                    src={userName ? elementStyle[1].preview : themeImgDef}
                    alt="Theme1 button"
                  />
                </button>
                <button
                  type="button"
                  className="theme-selection-button"
                  onClick={() => handleThemeChange("theme2")}
                >
                  <img
                    id="theme-btn-2"
                    src={userName ? elementStyle[2].preview : themeImgDef}
                    alt="Theme2 button"
                  />
                </button>
                <button
                  type="button"
                  className="theme-selection-button"
                  onClick={() => handleThemeChange("theme3")}
                >
                  <img
                    id="theme-btn-3"
                    src={userName ? elementStyle[3].preview : themeImgDef}
                    alt="Theme3 button"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="theme-card-preview">
            <img src={userTheme.preview} alt="" />
            <h3>{userName || ""}</h3>
          </div>
        </div>
        <Link to="/menu">
          <button
            id="onboarding-btn-next"
            type="button"
            className="onboarding-btn-next"
            style={{
              color: userTheme.color,
              backgroundColor: userTheme.backgroundColor,
              cursor: userTheme.crs,
            }}
            onClick={storeDataNext}
          >
            Suivant
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Onboarding;
