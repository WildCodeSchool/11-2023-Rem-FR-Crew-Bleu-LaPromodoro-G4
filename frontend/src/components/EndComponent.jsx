import React, { useEffect, useState } from "react";
import "../style/EndComponent.css";
import { Link } from "react-router-dom";

function EndComponent() {
  ////Récupration des infos utilisateur dans le LocalStorage/////
  const userNameLocalStorage = localStorage.getItem("userName");
  const [userImage, setImagePath] = useState("");

  useEffect(() => {
    const userThemeLocalStorage = localStorage.getItem("userTheme");

    if (userThemeLocalStorage) {
      const userThemeObject = JSON.parse(userThemeLocalStorage);
      const path = userThemeObject.preview;

      setImagePath(path);
    }
  }, []);

  ////Vider le LocalStorage////
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="end-component">
      <img className="picture-user" src={userImage} alt="picture_user" />
      <h1>
        Félicitations {userNameLocalStorage} <br /> Tu as atteint les 40 points
        !{" "}
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
  );
}

export default EndComponent;
