import "../style/MainNiveaux.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MainNiveaux() {
  // Récupération du thème de l'utilisateur depuis le localStorage
  const userTheme = JSON.parse(localStorage.getItem("userTheme")) || "";

  // Récupération et mise en place du score de l'utilisateur
  const userScoreFromLocalStorage =
    parseInt(localStorage.getItem("totalScore"), 10) || 0;
  const [userScore, setUserScore] = useState(userScoreFromLocalStorage);

  // Mise à jour du score si changé dans le localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedScore =
        parseInt(localStorage.getItem("totalScore"), 10) || 0;
      setUserScore(updatedScore);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="container">
      <div className="niveau1">
        <h2>Niveau 1: Écoute</h2>
        <Link to={userScore >= 10 ? "/ListenGameBis" : "/speech"}>
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
        {userScore >= 10 ? (
          <Link to={userScore >= 20 ? "/WordSynonymComponentBis" : "/synonym"}>
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
        ) : (
          <button
            type="button"
            className="btnEnter2"
            disabled
            style={{
              color: userTheme.color,
              backgroundColor: "#cccccc",
              cursor: "not-allowed",
            }}
          >
            Verrouillé
          </button>
        )}
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock2"
        />
      </div>

      <div className="niveau3">
        <h2>Niveau 3: Quizz</h2>
        {userScore >= 20 ? (
          <Link to="/quizz">
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
          </Link>
        ) : (
          <button
            type="button"
            className="btnEnter3"
            disabled
            style={{
              color: userTheme.color,
              backgroundColor: "#cccccc",
              cursor: "not-allowed",
            }}
          >
            Verrouillé
          </button>
        )}
        {/* <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock3"
        /> */}
      </div>
    </div>
  );
}

export default MainNiveaux;
