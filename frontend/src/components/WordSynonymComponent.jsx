import React, { useState, useEffect } from "react";
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
  const totalQuestions = 10;

  useEffect(() => {
    if (questionNumber <= totalQuestions) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const newWord = words[randomIndex];
      const mixedSynonyms = randomArray([
        ...newWord.correctSynonyms,
        ...newWord.falseSynonyms,
      ]);
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
      setScore((prevScore) => prevScore + 1);
    }

    if (questionNumber < totalQuestions) {
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setSelectedSynonym("");
    } else if (questionNumber === totalQuestions) {
      setShowSynonyms(false);
    }
  };

  const resetGame = () => {
    setQuestionNumber(1);
    setScore(0);
    setAnswers(Array(10).fill(null));
    setSelectedSynonym("");
    setShowSynonyms(true);
  };

  return (
    <div>
      <div className="retour">
        {/* <button className="quit-button">Quitter</button> */}
        <h2 className="level-title">Niveau 2 : Trouve les synonymes</h2>
      </div>
      <div className="game-container">
        <div className="card">
          <h3>Sélectionne le synonyme du mot suivant puis valide ta réponse</h3>
          <div className="score-display">Score: {score}</div>
          <div className="word-display">{currentWord.word}</div>
          {showSynonyms && (
            <div className="synonyms-container">
              {currentWord.synonyms.map((synonym) => (
                <button
                  type="button"
                  key={synonym}
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
          {selectedSynonym && (
            <button
              className="confirm-button"
              onClick={confirmSynonym}
              type="button"
            >
              Valider
            </button>
          )}
          {!showSynonyms && (
            <button
              type="button"
              className="restart-button"
              onClick={resetGame}
            >
              Redémarrer / Menu
            </button>
          )}
        </div>
        <AnswerBillesComponent answers={answers} />
      </div>
    </div>
  );
}

export default WordSynonymComponent;
