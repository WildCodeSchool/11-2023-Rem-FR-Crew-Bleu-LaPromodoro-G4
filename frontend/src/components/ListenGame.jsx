import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/ListenGame.css";
import Speech from "react-text-to-speech";
import AnswerBillesComponent from "./AnswerBillesComponent";
import speaker from "../assets/speak.png";

function ListenGame() {
  const words = [
    { id: "1", word: "Poulet" },
    { id: "2", word: "Nature" },
    { id: "3", word: "Armoire" },
    { id: "4", word: "Rambarde" },
    { id: "5", word: "Chaloupe" },
    { id: "6", word: "Hareng" },
    { id: "7", word: "Grenouille" },
    { id: "8", word: "Rododindron" },
    { id: "9", word: "Tilleul" },
    { id: "10", word: "Chrysanthème" },
  ];

  const startBtn = <img src={speaker} alt="speak" className="speaker" />;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [userScore, setUserScore] = useState(() => {
    const storedScore = localStorage.getItem("totalScore");
    const parsedScore = parseInt(storedScore, 10);
    return Number.isNaN(parsedScore) ? 0 : parsedScore;
  });

  useEffect(() => {
    localStorage.setItem("totalScore", Math.min(userScore, 10));
  }, [userScore]);

  const reinitialiserLocalStorage = () => {
    setUserScore(0);
  };

  const [userAnswers, setUserAnswers] = useState(
    Array(words.length).fill(null)
  );

  const handleNextWord = () => {
    const correctWord = words[currentWordIndex].word.toUpperCase();
    const isCorrect = userInput === correctWord;

    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentWordIndex] = isCorrect ? "correct" : "notcorrect";
      return newAnswers;
    });

    if (isCorrect) {
      setUserScore((prevScore) => Math.min(prevScore + 1, 10));
    }

    setCurrentWordIndex((prevIndex) => {
      if (prevIndex < words.length - 1) {
        setUserInput("");
        return prevIndex + 1;
      }
      setQuizFinished(true);
      return prevIndex;
    });
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toUpperCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNextWord();
    }
  };

  return (
    <>
      <div className="header">
        <Link to="/Menu" className="leave">
          {" "}
          Quitter
        </Link>
        <p className="level">Niveau 1: Écoute</p>
      </div>
      {quizFinished && (
        <div className="end">
          <p>Quiz terminé !</p>
        </div>
      )}
      <div className="game">
        <div className="quizSpace">
          <Speech
            text={words[currentWordIndex].word}
            pitch={1.5}
            rate={2}
            volume={0.5}
            startBtn={startBtn}
          />
          <input
            className="wordType"
            type="text"
            placeholder="tapez le mot ici"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleInputChange}
          />
          <div
            className={userInput !== "" ? "my-next-btn" : "no-next-btn"}
            role="button"
            tabIndex={0}
            onClick={handleNextWord}
            onKeyDown={handleKeyDown}
          >
            Suivant
          </div>
        </div>
        <AnswerBillesComponent answers={userAnswers} />
        <div className="score">
          Score: {userScore}/{words.length}
        </div>
        <button onClick={reinitialiserLocalStorage} type="button">
          Réinitialiser localStorage
        </button>
      </div>
    </>
  );
}

export default ListenGame;
