import React, { useState, useEffect } from "react";
import "../style/JeuOrdreLettres.css";

function JeuOrdreLettres() {
  const [mot, setMot] = useState("");
  const [reponseUtilisateur, setReponseUtilisateur] = useState("");
  const [resultat, setResultat] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [motAdeviner, setMotAdeviner] = useState("");
  const [totalScore, setTotalScore] = useState(30);
  const [points, setPoints] = useState(30);

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
    <div>
      <h1>Jeu d'Ordre de Lettres</h1>
      <p>Ordre des lettres: {mot.split("").join(" ")}</p>
      <label htmlFor="saisieOrdre">Saisissez la bonne ordre:</label>
      <input
        id="saisieOrdre"
        type="text"
        value={reponseUtilisateur}
        onChange={(e) => setReponseUtilisateur(e.target.value)}
      />
      <button className="bVerif" type="button" onClick={verificationReponse}>
        Vérifier
      </button>
      <p>{resultat}</p>
      <p>Score: {points}</p>
    </div>
  );
}

export default JeuOrdreLettres;
