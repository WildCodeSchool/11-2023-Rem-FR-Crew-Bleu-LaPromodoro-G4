/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/ListenGame.css";
import Speech from "react-text-to-speech";
import { motion } from "framer-motion";
import wordsArray from "./ListGameWords";
import AnswerBillesComponent from "./AnswerBillesComponent";
import Results from "./Results";
import speaker from "../assets/speak.png";
import "../App.css";

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

function ListenGame() {
  // Import themes
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState([""]);
  const [userInput, setUserInput] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    const shuffledWords = shuffleArray([...wordsArray]).slice(0, 10);
    setWords(shuffledWords);
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
      setUserScore((prevScore) => {
        const newScore = Math.min(prevScore + 1, 10);
        const storedScore = localStorage.getItem("totalScore");
        const parsedScore = parseInt(storedScore, 10);
        const updatedTotalScore = Number.isNaN(parsedScore)
          ? 1
          : Math.min(parsedScore + 1, 10);
        localStorage.setItem("totalScore", updatedTotalScore.toString());
        return newScore;
      });
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
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

  const levelTitle = "Niveau 1: Écoute fini !";

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
            <p className="level">Niveau 1: Écoute</p>
          </div>
        )}
        <div className="game">
          {quizFinished ? (
            <Results score={userScore} level={levelTitle} />
          ) : (
            <div className="quizSpace">
              <h3>Click sur l'icone puis entre ta réponse</h3>
              <Speech
                className="speech-icon"
                text={words[currentWordIndex].word}
                lang="FR"
                startBtn={startBtn}
                onError={() => console.error("Browser not supported!")}
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
                scale: userInput !== "" ? "1.1" : "1",
                color: userInput !== "" ? userTheme.color : "#b3b3b3",
                backgroundColor:
                  userInput !== "" ? userTheme.backgroundColor : "white",
                cursor: userTheme.crs,
              }}
              className={userInput !== "" ? "my-next-btn" : "no-next-btn"}
              role="button"
              tabIndex={0}
              onClick={handleNextWord}
              onKeyDown={handleKeyPress}
            >
              <p>Suivant</p>
            </div>
          )}
        </div>
        <div className="realtime">
          <AnswerBillesComponent answers={userAnswers} />
        </div>
      </div>
    </>
  );
}

export default ListenGame;
