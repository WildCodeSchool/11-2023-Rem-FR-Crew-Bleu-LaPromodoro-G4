import { useState } from "react";
import "../style/ListenGame.css";
import Speech from "react-text-to-speech";
// import logo from "../assets/Group_1.png";

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

  // BOUTON POUR LANCER LE TEXT TO SPEECJ

  const startBtn = (
    <button className="my-start-btn" type="button">
      Cliquez pour écouter
    </button>
  );

  // lISTES DES STATES

  // state actualisant le mot du tableau
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // state actualisant l'input que rentre l'utilisateur pour épeler le mot du speech
  const [userInput, setUserInput] = useState("");
  // state actualisant le score selon les réponses de l'utilisateur dans l'input
  const [userScore, setUserScore] = useState(0);
  // state qui détermine si le quiz est arrivé au bout des mots du tableau
  const [quizFinished, setQuizFinished] = useState(false);
  // state initialisée comme tableau où seront stockée les réponses de l'utilisateur (remplit de null qui change aux rentrées d'input du user)
  const [userAnswers, setUserAnswers] = useState(
    Array(words.length).fill(null)
  );

  // Fonction appelée lors du passage au mot suivant
  const handleNextWord = () => {
    const correctWord = words[currentWordIndex].word.toUpperCase();
    const isCorrect = userInput === correctWord;

    // Mise à jour des réponses de l'utilisateur
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentWordIndex] = isCorrect;
      return newAnswers;
    });

    // Mise à jour du score de l'utilisateur
    setUserScore((prevScore) => prevScore + (isCorrect ? 1 : 0));

    // Passage au mot suivant ou fin du quiz
    setCurrentWordIndex((prevIndex) => {
      if (prevIndex < words.length - 1) {
        setUserInput("");
        return prevIndex + 1;
      }
      setQuizFinished(true);
      return prevIndex;
    });
  };

  // Passage de la saisie du user en majuscule
  const handleInputChange = (e) => {
    setUserInput(e.target.value.toUpperCase());
  };

  // fonction pour que la touche entrée provoque la fonction handleNextWord
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNextWord();
    }
  };

  return (
    <>
      {/* <img className="logo1" src={logo} alt="" /> */}
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
          <div className={quizFinished ? "myNoSpeech" : "mySpeech"}>
            <Speech
              className="speech"
              text={words[currentWordIndex].word}
              pitch={1.5}
              rate={2}
              volume={0.3}
              startBtn={startBtn}
            />
          </div>
          <input
            className="wordType"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div
            tabIndex={0}
            role="button"
            className={userInput !== "" ? "my-next-btn" : "no-next-btn"}
            onClick={handleNextWord}
            onKeyDown={handleNextWord}
          >
            Suivant
          </div>
        </div>
        {/* Barre de progression, si les user answers sont true active classe true sinon false */}
        <div className="progressBar">
          {words.map((word, index) => {
            let className = "";

            if (userAnswers[index] !== null) {
              className = userAnswers[index] ? "true" : "false";
            }

            return <div key={word.id} className={className} />;
          })}
        </div>
        <div className="score">{`${userScore}/10`}</div>
      </div>
    </>
  );
}

export default ListenGame;
