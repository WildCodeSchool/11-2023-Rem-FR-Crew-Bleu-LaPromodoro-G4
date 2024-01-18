import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AnswerBillesComponent from "./AnswerBillesComponent";
import "../style/WordSynonymComponent.css";

const randomArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const words = [
  {
    word: "Lumineux",
    correctSynonyms: ["Brillant"],
    falseSynonyms: ["Sombre"],
  },
  {
    word: "Froid",
    correctSynonyms: ["Glacial"],
    falseSynonyms: ["Brûlant"],
  },
  {
    word: "Ancien",
    correctSynonyms: ["Vieux"],
    falseSynonyms: ["Moderne"],
  },
  {
    word: "Difficile",
    correctSynonyms: ["Ardu"],
    falseSynonyms: ["Facile"],
  },
  {
    word: "Petit",
    correctSynonyms: ["Minuscule"],
    falseSynonyms: ["Grand"],
  },
  {
    word: "Humide",
    correctSynonyms: ["Mouillé"],
    falseSynonyms: ["Sec"],
  },
  {
    word: "Amusant",
    correctSynonyms: ["Divertissant"],
    falseSynonyms: ["Ennuyeux"],
  },
  {
    word: "Riche",
    correctSynonyms: ["Fortuné"],
    falseSynonyms: ["Démuni"],
  },
  {
    word: "Intense",
    correctSynonyms: ["Fort"],
    falseSynonyms: ["Léger"],
  },
  {
    word: "Calme",
    correctSynonyms: ["Tranquille"],
    falseSynonyms: ["Agité"],
  },
  {
    word: "Joyeux",
    correctSynonyms: ["Heureux"],
    falseSynonyms: ["Malheureux"],
  },
  {
    word: "Rapide",
    correctSynonyms: ["Véloce"],
    falseSynonyms: ["Tranquille"],
  },
  {
    word: "Intelligent",
    correctSynonyms: ["Astucieux"],
    falseSynonyms: ["Créatif"],
  },
  { word: "Aimer", correctSynonyms: ["Adorer"], falseSynonyms: ["Détester"] },
  { word: "Grand", correctSynonyms: ["Enorme"], falseSynonyms: ["Petit"] },
  { word: "Riche", correctSynonyms: ["Opulant"], falseSynonyms: ["Pauvre"] },
  {
    word: "Silencieux",
    correctSynonyms: ["Calme"],
    falseSynonyms: ["Bruyant"],
  },
  { word: "Voyager", correctSynonyms: ["Explorer"], falseSynonyms: ["Rester"] },
  { word: "Manger", correctSynonyms: ["Déguster"], falseSynonyms: ["Boire"] },
  { word: "Peur", correctSynonyms: ["Effroi"], falseSynonyms: ["Courage"] },
];

function WordSynonymComponent() {
  const [currentWord, setCurrentWord] = useState({
    word: "",
    synonyms: [],
    correctSynonyms: [],
  });
  const [selectedSynonym, setSelectedSynonym] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [showSynonyms, setShowSynonyms] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const totalQuestions = 10;

  useEffect(() => {
    if (!localStorage.getItem("totalScore")) {
      localStorage.setItem("totalScore", "10");
    }
    if (questionNumber <= totalQuestions) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const newWord = words[randomIndex];
      const mixedSynonyms = randomArray([
        ...newWord.correctSynonyms,
        ...newWord.falseSynonyms,
      ]);
      randomArray(mixedSynonyms);
      setCurrentWord({ ...newWord, synonyms: mixedSynonyms });
    }
  }, [questionNumber]);

  const handleSynonymSelection = (synonym) => {
    setSelectedSynonym(synonym);
  };

  const confirmSynonym = () => {
    const isCorrect = currentWord.correctSynonyms.includes(selectedSynonym);
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber - 1] = isCorrect ? "correct" : "notcorrect";
    setAnswers(updatedAnswers);

    if (isCorrect) {
      setScore((prevScore) => {
        const newScore = Math.min(prevScore + 1, 20);
        const existingScore =
          parseInt(localStorage.getItem("totalScore"), 10) || 10;
        const updatedTotalScore = Math.min(existingScore + 1, 20);
        localStorage.setItem("totalScore", updatedTotalScore.toString());
        return newScore;
      });
    }
    // console.info(
    //   `Question Numéro: ${questionNumber}, / ${totalQuestions}`
    // );
    // console.info(`Is Correct: ${isCorrect}, nouvo score: ${newScore}`);

    if (questionNumber < totalQuestions) {
      setQuestionNumber(questionNumber + 1);
      setSelectedSynonym("");
    } else if (questionNumber === totalQuestions) {
      // console.info(
      //   "totalScore dans le localStorage: ${updatedScore}"
      // );
      setShowSynonyms(false);
      setQuizFinished(true);
    }
  };

  return (
    <div>
      <div className="retour">
        <Link to="/menu">
          <button type="button" className="quit-button">
            Quitter
          </button>
        </Link>
        <h2 className="level-title">Niveau 2 : Trouve les synonymes</h2>
      </div>
      <div className="game-container">
        <div className="card">
          <h3>Sélectionne le synonyme du mot suivant puis valide ta réponse</h3>
          {quizFinished && (
            <div className="end">
              <p>Quiz terminé !</p>
              {/* Vous pouvez ajouter d'autres éléments ici si nécessaire */}
            </div>
          )}
          <div className="score-display">Score: {score}</div>
          <div className="word-display">{currentWord.word}</div>
          {showSynonyms && (
            <div className="synonyms-container">
              {currentWord.synonyms.map((synonym) => (
                <button
                  key={synonym}
                  type="button"
                  className={`synonym-button ${
                    selectedSynonym === synonym ? "selected" : ""
                  }`}
                  onClick={() => handleSynonymSelection(synonym)}
                >
                  {synonym}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="container-button">
          <button
            className="confirm-button"
            onClick={confirmSynonym}
            type="button"
          >
            Valider
          </button>
        </div>
        <AnswerBillesComponent answers={answers} />
      </div>
    </div>
  );
}

export default WordSynonymComponent;
