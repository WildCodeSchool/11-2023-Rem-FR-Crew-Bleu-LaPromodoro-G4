import { useState, useEffect } from "react";
import "../style/ListenGame.css";
import Speech from "react-text-to-speech";
import AnswerBillesComponent from "./AnswerBillesComponent";

// import logo from "../assets/Group_1.png"

function ListenGame() {
  const words = [
    { id: "1", word: "Poulet" },
    { id: "2", word: "Nature" },
    { id: "3", word: "Armoire" },
    { id: "4", word: "Rembarde" },
    { id: "5", word: "Chaloupe" },
    { id: "6", word: "Hareng" },
    { id: "7", word: "Grenouille" },
    { id: "8", word: "Rododindron" },
    { id: "9", word: "Tilleul" },
    { id: "10", word: "chrysanthème" },
  ];

  const startBtn = (
    <button className="my-start-btn" type="button">
      Cliquez pour écouter
    </button>
  );

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [userScore, setUserScore] = useState(
    parseInt(localStorage.getItem("totalScore"), 10) || 10
  );

  useEffect(() => {
    localStorage.setItem("totalScore", userScore.toString());
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
      setUserScore((prevScore) => prevScore + 1);
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
        <div className="leave">Quitter</div>
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
            volume={0.3}
            startBtn={startBtn}
          />
          <input
            className="wordType"
            type="text"
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
