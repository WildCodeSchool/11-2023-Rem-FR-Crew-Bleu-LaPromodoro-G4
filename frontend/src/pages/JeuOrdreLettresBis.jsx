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
    setMot(obtenirMotAleatoire()); // c'est le mot mélangé pour l'affichage
    setIsLoading(false); // fin du chargement
    setReponseUtilisateur(""); // on Réinitialise la réponse de l'utilisateur
  }, [answerStatus]);

  useEffect(() => {
    console.info("Le score a été mis à jour :", points); // affiche score actuel (pour nous car j'y arrivais pas)
  }, [points]); // On déclenche ca a chaque changement du score

  const verificationReponse = () => {
    const isCorrect = reponseUtilisateur === motAdeviner; // verifie si la réponse est ok ou pas
    const currentAnswer = isCorrect ? "correct" : "notcorrect"; // Statut réponse (pour les billes)
    const questionIndex = answers.filter((answer) => answer !== "empty").length; // index de la question
    const updatedAnswers = [...answers]; // copie du tableau de reponses
    updatedAnswers[questionIndex] = currentAnswer; // on met jour le statut de la réponse
    setAnswers(updatedAnswers); // Onenregistre le tableau

    if (isCorrect) {
      setPoints((prevPoints) => (prevPoints < 10 ? prevPoints + 1 : 10)); // on augmente le score si la réponse est correcte.
      obtenirMotAleatoire(); // hop un nouveau mot pour la prochaine question
    }
    setAnswerStatus(currentAnswer); // on met à jour le statut de la réponse.
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
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
          <AnswerBilles answers={answers} />
          <p>{answerStatus}</p>
          <p>Score: {points}/10</p>
        </>
      )}
    </div>
  );
}

export default JeuOrdreLettres;
