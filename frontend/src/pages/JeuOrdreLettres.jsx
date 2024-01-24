import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/JeuOrdreLettres.css";

function JeuOrdreLettres() {
  const [mot, setMot] = useState("");
  const [reponseUtilisateur, setReponseUtilisateur] = useState("");
  const [resultat, setResultat] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [motAdeviner, setMotAdeviner] = useState("");
  const [totalScore, setTotalScore] = useState(30);
  const [points, setPoints] = useState(30);

  // Import themes
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  useEffect(() => {
    const obtenirMotAleatoire = () => {
      const mots = ["chat", "poulet", "bonjour"];
      const motAleatoire = mots[Math.floor(Math.random() * mots.length)];
      setMotAdeviner(motAleatoire);

      const tableauCaractere = motAleatoire.split("");
      tableauCaractere.sort(() => {
        return 0.5 - Math.random();
      });

      const stringSort = tableauCaractere.join("");
      return stringSort;
    };
    setMot(obtenirMotAleatoire());
    setIsLoading(false);
  }, [resultat, totalScore]);

  const verificationReponse = () => {
    const reponseCorrecte = motAdeviner;
    console.info(motAdeviner, reponseCorrecte, totalScore);
    if (reponseUtilisateur === reponseCorrecte) {
      setPoints(points + 1);
      setTotalScore(totalScore + 1);
      setResultat("Bravo !");
    } else {
      setResultat("Réessayez.");
    }
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="myLevelBody">
      <div className="header">
        <Link
          to="/Menu"
          className="leave"
          style={{
            color: userTheme.color,
            backgroundColor: userTheme.backgroundColor,
            cursor: userTheme.crs,
          }}
        >
          {" "}
          Quitter
        </Link>
        <p className="level">Niveau IV: Ordre des lettres</p>
      </div>
      <div className="game">
        <div className="card">
          <label htmlFor="saisieOrdre">
            Saisissez le bon ordre: {mot.split("").join(" ")}
          </label>
          <input
            className="wordType"
            type="text"
            placeholder="tapez le mot ici"
            value={reponseUtilisateur}
            onChange={(e) => setReponseUtilisateur(e.target.value)}
          />
        </div>
        <div
          style={{
            scale: reponseUtilisateur !== "" ? "1.1" : "1",
            color: reponseUtilisateur !== "" ? userTheme.color : "#b3b3b3",
            backgroundColor:
              reponseUtilisateur !== "" ? userTheme.backgroundColor : "white",
            cursor: userTheme.crs,
          }}
          className={reponseUtilisateur !== "" ? "my-next-btn" : "no-next-btn"}
          role="button"
          tabIndex={0}
          onClick={verificationReponse}
          // onKeyDown={handleKeyDown}
        >
          <p>Suivant</p>
        </div>
        <p>{resultat}</p>
        <p className="scoreJeuDesLettres">Score: {points}</p>
      </div>
    </div>
  );
}

export default JeuOrdreLettres;
