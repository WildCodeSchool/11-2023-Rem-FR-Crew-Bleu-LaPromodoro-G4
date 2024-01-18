import "../style/MainNiveaux.css";
import { Link } from "react-router-dom";
import { useState, React } from "react";

function MainNiveaux() {
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  return (
    <div className="container">
      <div className="niveau1">
        <h2>Niveau 1: Ecoute</h2>
        <Link to="/speech">
          <button
            type="button"
            className="btnEnter1"
            style={{
              color: userTheme.color,
              backgroundColor: userTheme.backgroundColor,
              cursor: userTheme.crs,
            }}
          >
            Entrer
          </button>
        </Link>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock1"
        />
      </div>
      <div className="niveau2">
        <h2>Niveau 2: Synonymes</h2>
        <Link to="/synonym">
          <button
            type="button"
            className="btnEnter2"
            style={{
              color: userTheme.color,
              backgroundColor: userTheme.backgroundColor,
              cursor: userTheme.crs,
            }}
          >
            Entrer
          </button>
        </Link>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock2"
        />
      </div>
      <div className="niveau3">
        <h2 className="titleDefinition">Niveau 3: Définitions</h2>
        <button
          type="button"
          className="btnEnter3"
          style={{
            color: userTheme.color,
            backgroundColor: userTheme.backgroundColor,
            cursor: userTheme.crs,
          }}
        >
          Entrer
        </button>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock3"
        />
      </div>
      <div className="niveau4">
        <h2 className="titleDefinition">Niveau 4: ????? </h2>
        <button
          type="button"
          className="btnEnter4"
          style={{
            color: userTheme.color,
            backgroundColor: userTheme.backgroundColor,
            cursor: userTheme.crs,
          }}
        >
          Entrer
        </button>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock4"
        />
      </div>
    </div>
  );
}

export default MainNiveaux;
