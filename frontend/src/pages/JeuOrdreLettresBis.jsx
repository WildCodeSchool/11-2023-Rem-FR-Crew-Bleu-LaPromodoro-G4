/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import "../style/JeuOrdreLettres.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnswerBilles from "../components/AnswerBillesComponent";

// Création d'un tableau par défaut pour les réponses, initialisé avec "empty".
const defaultAnswers = new Array(10).fill("empty");

// Définition du composant fonctionnel 'JeuOrdreLettres'.
function JeuOrdreLettres() {
  const [mot, setMot] = useState(""); // mot à afficher pour l'utilisateur
  const [reponseUtilisateur, setReponseUtilisateur] = useState(""); // réponse donnée par l'utilisateur
  const [answerStatus, setAnswerStatus] = useState(""); // etat de la réponse (correcte ou incorrecte)
  // const [isLoading, setIsLoading] = useState(true);
  const [motAdeviner, setMotAdeviner] = useState(""); // mot à deviner
  const [points, setPoints] = useState(0); //  points accumules par l'utilisateur
  const [answers, setAnswers] = useState(defaultAnswers); // réponses données pour chaque tentative

  // Import themes
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

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
    // setIsLoading(false); // fin du chargement
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
    <>
      <motion.div
        className="slide-in1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-in2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out2"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
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
          <p className="level">Niveau 3: Ordre des lettres</p>
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
            className={
              reponseUtilisateur !== "" ? "my-next-btn" : "no-next-btn"
            }
            role="button"
            tabIndex={0}
            onClick={verificationReponse}
            // onKeyDown={handleKeyDown}
          >
            <p>Suivant</p>
          </div>
          <AnswerBilles answers={answers} />{" "}
          <p className="etatReponse">{answerStatus}</p>{" "}
          {/* affichage de l'état de la réponse */}
          <p className="scoreDisplay">Score: {points}/10</p>{" "}
          {/* affichage du score */}
        </div>
      </div>
    </>
  );
}

export default JeuOrdreLettres;
