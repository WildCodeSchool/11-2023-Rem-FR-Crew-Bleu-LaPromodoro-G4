/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../style/JeuOrdreLettres.css";
import AnswerBilles from "../components/AnswerBillesComponent";
import Results from "../components/Results";

// Création d'un tableau par défaut pour les réponses, initialisé avec "empty".
const defaultAnswers = new Array(10).fill("empty");

// Définition du composant fonctionnel 'JeuOrdreLettres'.
function JeuOrdreLettres() {
  const [mot, setMot] = useState(""); // mot à afficher pour l'utilisateur
  const [reponseUtilisateur, setReponseUtilisateur] = useState(""); // réponse donnée par l'utilisateur
  const [answerStatus, setAnswerStatus] = useState(""); // etat de la réponse (correcte ou incorrecte)
  // const [isLoading, setIsLoading] = useState(true);
  const [motAdeviner, setMotAdeviner] = useState(""); // mot à deviner
  const [totalScore, setTotalScore] = useState(30); // score total (debutes à 30) pour le localStorage
  const [points, setPoints] = useState(0); //  points accumules par l'utilisateur
  const [answers, setAnswers] = useState(defaultAnswers); // réponses données pour chaque tentative
  const [quizFinished, setQuizFinished] = useState(false);

  // Import themes
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  const obtenirMotAleatoire = () => {
    const mots = ["chat", "poulet", "bonjour"];
    const motAleatoire = mots[Math.floor(Math.random() * mots.length)];
    setMotAdeviner(motAleatoire);

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
    // setIsLoading(false); // Fin du chargement
    setReponseUtilisateur(""); // Reinitialisation de la réponse utilisateur
  }, [answerStatus, totalScore]);

  // useEffect pour surveiller les changements de points
  useEffect(() => {
    console.info("Le score a été mis à jour :", points);
    const allAnswersGiven = answers.every((answer) => answer !== "empty");
    if (allAnswersGiven) {
      setQuizFinished(true);
    }
  }, [points, answers]);

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

  const levelTitle = "Niveau 4: Ordre des lettres fini !";

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
        {quizFinished ? (
          ""
        ) : (
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
            <p className="level">Niveau 4: Ordre des lettres</p>
          </div>
        )}
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
        <div className="game">
          {quizFinished ? (
            <Results score={points} level={levelTitle} />
          ) : (
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
          )}
          {quizFinished ? (
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
          ) : (
            <div
              style={{
                scale: reponseUtilisateur !== "" ? "1.1" : "1",
                color: reponseUtilisateur !== "" ? userTheme.color : "#b3b3b3",
                backgroundColor:
                  reponseUtilisateur !== ""
                    ? userTheme.backgroundColor
                    : "white",
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
          )}
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
