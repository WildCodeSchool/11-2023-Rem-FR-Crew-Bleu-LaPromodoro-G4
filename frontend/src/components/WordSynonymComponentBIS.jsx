import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AnswerBillesComponent from "./AnswerBillesComponent";
import Results from "./Results";
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

function WordSynonymComponentBIS() {
  const [isHovered, setIsHovered] = useState(false);
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

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
      setScore((prevScore) => Math.min(prevScore + 1, 20));
    }

    if (questionNumber < totalQuestions) {
      setQuestionNumber(questionNumber + 1);
      setSelectedSynonym("");
    } else if (questionNumber === totalQuestions) {
      setShowSynonyms(false);
      setQuizFinished(true);
    }
  };

  const endTitle = "Niveau 2 : Trouve les synonymes fini !";

  return (
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
          <p className="level">Niveau 2: Synonyme</p>
        </div>
      )}
      <div className="game">
        {quizFinished ? (
          <Results score={score} level={endTitle} />
        ) : (
          <div className="card">
            <h3>
              Sélectionne le synonyme du mot suivant puis valide ta réponse
            </h3>
            <div className="word-display">{currentWord.word}</div>
            {showSynonyms && (
              <div className="synonyms-container">
                {currentWord.synonyms.map((synonym) => (
                  <button
                    key={synonym}
                    type="button"
                    style={{
                      color: selectedSynonym === synonym ? userTheme.color : "",
                      backgroundColor:
                        selectedSynonym === synonym
                          ? userTheme.backgroundColor
                          : "",
                      cursor: userTheme.crs,
                    }}
                    className="synonym-button"
                    onClick={() => handleSynonymSelection(synonym)}
                  >
                    {synonym}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {quizFinished ? (
          <Link to="/menu">
            <button type="button" className="leave">
              Quitter
            </button>
          </Link>
        ) : (
          <button
            className="leave"
            onClick={confirmSynonym}
            type="button"
            style={{
              color: isHovered ? userTheme.color : "",
              backgroundColor: isHovered ? userTheme.backgroundColor : "",
              cursor: userTheme.crs,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Valider
          </button>
        )}
      </div>
      <div className="realtime">
        <AnswerBillesComponent answers={answers} />
      </div>
    </div>
  );
}

export default WordSynonymComponentBIS;
