import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardQuizz from "../components/CardQuizz";
import AnswerBillesComponent from "../components/AnswerBillesComponent";
import Results from "../components/Results";

function Quizz() {
  const [count, setCount] = useState(() => {
    const storedScore = localStorage.getItem("totalScore");
    const parsedScore = storedScore ? parseInt(storedScore, 10) : 20;
    return Number.isNaN(parsedScore) ? 20 : Math.max(parsedScore, 20);
  });

  const [finished, setFinished] = useState(false);
  const [localScore, setLocalScore] = useState(0);

  useEffect(() => {
    localStorage.setItem("totalScore", count.toString());
  }, [count]);

  const [answerBullets, setAnswerBullets] = useState(Array(10).fill(""));

  const incrementCount = (cardId, isRight) => {
    if (isRight) {
      setCount((prevCount) => Math.min(prevCount + 1, 30));
      setLocalScore(localScore + 1);
      answerBullets[cardId - 1] = "correct";
    } else {
      answerBullets[cardId - 1] = "notcorrect";
    }
    // get div element from HTML page to put the score inside
    const divScore = document.getElementById("score");
    divScore.innerHTML = localScore.toString();

    // changed element of answer array into correct
    const updatedBullets = [...answerBullets];
    updatedBullets[cardId - 1] = isRight ? "correct" : "notcorrect";
    setAnswerBullets(updatedBullets);

    if (cardId === 10) {
      // const divResults = document.getElementById("divResults");
      // divResults.classList.remove("cardsHide");

      const header = document.getElementById("headerQuizz");
      header.classList.add("cardsHide");
      setFinished(true);
    }

    // store the score in the local storage
    localStorage.setItem("totalScore", count.toString());
  };

  const levelTitle3 = "Niveau 3: Quizz fini !";

  return (
    <div className="myLevelBodyQ">
      <div id="headerQuizz" className="headerQuizz">
        <Link to="/Menu" className="leaveQuizz">
          {" "}
          Quitter
        </Link>
        <p className="levelQuizz">Niveau 3: Quizz</p>
        <div className="scoreQuizz">
          <div>Score:</div>
          <div id="score">0</div>
        </div>
      </div>
      <div className="gameQ">
        <div
          id="divResults"
          className={finished ? "containerResult" : "cardsHide"}
        >
          <Results score={localScore} level={levelTitle3} />
        </div>

        {finished ? (
          <Link to="/Menu" className="leaveQuizz">
            {" "}
            Quitter
          </Link>
        ) : (
          <div className="pageContainer">
            <CardQuizz incrementCount={incrementCount} />
          </div>
        )}
      </div>

      <div className="resultContainer">
        <AnswerBillesComponent answers={answerBullets} />
      </div>
    </div>
  );
}

export default Quizz;
