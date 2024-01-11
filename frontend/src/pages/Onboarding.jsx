import "../root.css";
import "./Onboarding.css";
import { useState, useEffect } from "react";

import themeImg1 from "../assets/theme1.png";
import themeImg2 from "../assets/theme2.png";
import themeImg3 from "../assets/theme3.png";

function Onboarding() {
  //  Initialisation des use state
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");

  //  A VOIR
  const [themeClr, setThemeClr] = useState(
true);

  //  Initialisation des use effect pour voir les changements en temps réel + stocker les infos dans le localstorage

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("themeClr", themeClr);
  }, [theme]);

  // Fonction changement de nom en temps réel
  const handleNameChange = (event) => {
    const newUserName = event.target.value;
    setUserName(newUserName);

    const nextButton = document.getElementById("onboarding-btn-next");

    if (newUserName.trim() !== "") {
      nextButton.classList.add("onboarding-btn-next-active-theme1");
    } else {
      nextButton.classList.remove("onboarding-btn-next-active-theme1");
    }
  };

  // Fonction changement de theme et couleur de bouton au click sur le theme
  const handleThemeChange = (selectedTheme, selectedClr) => {
    setTheme(selectedTheme);
    setThemeClr(selectedClr);
  };

  // TEST BUTTON COLOR UPDATE THEME



  const themes = [
    { id: 1, src: themeImg1 /* clr: themeClr1 */ },
    { id: 2, src: themeImg2 /* clr: themeClr2 */ },
    { id: 3, src: themeImg3 /* clr: themeClr3 */ },
  ];

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
                placeholder="Jack"
                type="text"
                value={userName}
                onChange={handleNameChange}
              />
            </div>
            <div className="input-div">
              <h2>Choisis un thème</h2>
              <div className="theme-selection">
                {themes.map((theme) => (
                  <button
                    type="button"
                    key={theme.id}
                    className="theme-selection-button"
                    onClick={() => handleThemeChange(theme.src, theme.clr)}
                  >
                    <img src={theme.src} alt="This is your thumbnail" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="theme-card-preview">
            <img src={theme} alt="" />
            <h3>{userName || "Nom"}</h3>
          </div>
        </div>
        <button
          id="onboarding-btn-next"
          type="button"
          className="onboarding-btn-next"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
