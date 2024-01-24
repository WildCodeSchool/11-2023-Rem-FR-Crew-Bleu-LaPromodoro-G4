import React, { useEffect, useState } from "react";
import "../style/EndComponent.css";
import { Link } from "react-router-dom";

function EndComponent() {
  const userNameFromLocalStorage = localStorage.getItem("userName");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    const userThemeFromLocalStorage = localStorage.getItem("userTheme");

    if (userThemeFromLocalStorage) {
      const userThemeObject = JSON.parse(userThemeFromLocalStorage);
      const path = userThemeObject.preview;

      setImagePath(path);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="end-component">
      <img className="picture" src={imagePath} alt="" />
      <h1>
        Félicitations {userNameFromLocalStorage} <br /> Tu as atteint les 40
        points !{" "}
      </h1>

      <Link to="/onboarding">
        <button
          type="button"
          className="btn-restart"
          onClick={clearLocalStorage}
        >
          Revenir au menu
        </button>
      </Link>
    </div>
  );
}

export default EndComponent;
