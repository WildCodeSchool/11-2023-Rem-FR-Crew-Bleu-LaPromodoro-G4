import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/ListenGame.css";
import Speech from "react-text-to-speech";
import wordsArray from "./ListGameWords";
import AnswerBillesComponent from "./AnswerBillesComponent";
import Results from "./Results";
import speaker from "../assets/speak.png";

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

function ListenGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState([""]);
  const [userInput, setUserInput] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [userScore, setUserScore] = useState(() => {
    const storedScore = localStorage.getItem("totalScore");
    const parsedScore = parseInt(storedScore, 10);
    return Number.isNaN(parsedScore) ? 0 : parsedScore;
  });

  const reinitialiserLocalStorage = () => {
    setUserScore(0);
  };

  useEffect(() => {
    const shuffledWords = shuffleArray([...wordsArray]).slice(0, 10);
    setWords(shuffledWords);
    localStorage.setItem("totalScore", Math.min(userScore, 10));
    reinitialiserLocalStorage(setUserScore(0));
  }, []);

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

  const startBtn = (
    <img
      src={speaker}
      alt="speak"
      className={quizFinished ? "noSpeaker" : "speaker"}
    />
  );

  return (
    <div className="myLevelBody">
      <div className="header">
        <Link to="/Menu" className="leave">
          {" "}
          Quitter
        </Link>
        <p className="level">Niveau 1: Écoute</p>
      </div>
      <div className="game">
        {quizFinished ? (
          <Results score={userScore} />
        ) : (
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
          </div>
        )}
        {/* style du theme */}
        <div
          className={userInput !== "" ? "my-next-btn" : "no-next-btn"}
          role="button"
          tabIndex={0}
          onClick={handleNextWord}
          onKeyDown={handleKeyDown}
        >
          <p>Suivant</p>
        </div>
        <AnswerBillesComponent answers={userAnswers} />
        <button onClick={reinitialiserLocalStorage} type="button">
          Réinitialiser localStorage
        </button>
      </div>
    </div>
  );
}

export default ListenGame;
