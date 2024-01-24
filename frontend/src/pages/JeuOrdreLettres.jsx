import React, { useState, useEffect } from "react";
import "../style/JeuOrdreLettres.css";
import AnswerBilles from "../components/AnswerBillesComponent";

// Création d'un tableau par défaut pour les réponses, initialisé avec "empty".
const defaultAnswers = new Array(10).fill("empty");

// Définition du composant fonctionnel 'JeuOrdreLettres'.
function JeuOrdreLettres() {
  const [mot, setMot] = useState(""); // mot à afficher pour l'utilisateur
  const [reponseUtilisateur, setReponseUtilisateur] = useState(""); // réponse donnée par l'utilisateur
  const [answerStatus, setAnswerStatus] = useState(""); // etat de la réponse (correcte ou incorrecte)
  const [isLoading, setIsLoading] = useState(true);
  const [motAdeviner, setMotAdeviner] = useState(""); // mot à deviner
  const [totalScore, setTotalScore] = useState(30); // score total (debutes à 30) pour le localStorage
  const [points, setPoints] = useState(0); //  points accumules par l'utilisateur
  const [answers, setAnswers] = useState(defaultAnswers); // réponses données pour chaque tentative

  // Fonction pour obtenir un mot aléatoire de la liste + melange
  const obtenirMotAleatoire = () => {
    const mots = ["chat", "poulet", "bonjour"]; // Liste de mots.
    const motAleatoire = mots[Math.floor(Math.random() * mots.length)]; // Sélection aléatoire.
    setMotAdeviner(motAleatoire); // Mise à jour du mot à deviner.

    // Mélange des caractères
    const tableauCaractere = motAleatoire.split("");
    tableauCaractere.sort(() => 0.5 - Math.random());
    const stringSort = tableauCaractere.join("");
    return stringSort;
  };

  // useEffect pour initialiser le jeu
  useEffect(() => {
    const scoreGlobalInitial = localStorage.getItem("totalScore") || 30;
    setTotalScore(parseInt(scoreGlobalInitial, 10)); // récupération du score global
    setMot(obtenirMotAleatoire()); // Mise à jour du mot
    setIsLoading(false); // Fin du chargement
    setReponseUtilisateur(""); // Reinitialisation de la réponse utilisateur
  }, [answerStatus, totalScore]);

  // useEffect pour surveiller les changements de points
  useEffect(() => {
    console.info("Le score a été mis à jour :", points);
  }, [points]);

  // fonction pour vérifier la réponse de l'utilisateur
  const verificationReponse = () => {
    const isCorrect = reponseUtilisateur === motAdeviner; // vérification de la réponse
    const currentAnswer = isCorrect ? "correct" : "notcorrect";

    // mise à jour de la liste des réponses
    const questionIndex = answers.filter((answer) => answer !== "empty").length;
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    // mise à jour des points et du score total si la réponse  OK
    if (isCorrect) {
      setPoints((prevPoints) => (prevPoints < 10 ? prevPoints + 1 : 10));
      setTotalScore((prevTotalScore) => {
        const newTotalScore = prevTotalScore < 40 ? prevTotalScore + 1 : 40;
        localStorage.setItem("totalScore", newTotalScore.toString());
        obtenirMotAleatoire();
      });
    }
    setAnswerStatus(currentAnswer); // mise à jour de l'état de la réponse
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Affichage pendant le chargement.
      ) : (
        <>
          <h1>Jeu d'Ordre de Lettres</h1>
          <p>Ordre des lettres: {mot.split("").join(" ")}</p>
          <label htmlFor="saisieOrdre">Saisissez la bonne ordre:</label>
          <input
            id="saisieOrdre"
            type="text"
            value={reponseUtilisateur}
            onChange={(e) => setReponseUtilisateur(e.target.value)}
          />
          <button
            className="bVerif"
            type="button"
            onClick={verificationReponse}
          >
            Vérifier
          </button>
          <AnswerBilles answers={answers} />{" "}
          {/* affichage des billes de réponse */}
          <p>{answerStatus}</p> {/* affichage de l'état de la réponse */}
          <p>Score: {points}/10</p> {/* affichage du score */}
        </>
      )}
    </div>
  );
}

export default JeuOrdreLettres;
