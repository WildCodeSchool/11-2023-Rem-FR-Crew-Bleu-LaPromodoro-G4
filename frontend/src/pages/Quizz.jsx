import React, { useState } from "react";
import CardQuizz from "../components/CardQuizz";
import AnswerBillesComponent from "../components/AnswerBillesComponent";

const answerBullets = ["", "", "", "", ""];

const quizzAnimal = [
  {
    question: "Qu'est-ce qu'un animal arboricole ?",
    answer1: "An animal qui mangent les feuilles.",
    answer2: "An animal qui vit dans les arbres.",
    validAnswer: 2,
  },
  {
    question: "Quel animal est doté d'un exosquelette ?",
    answer1: "Tortue",
    answer2: "Méduse",
    validAnswer: 1,
  },
  {
    question: "Quel est le plus grand oiseau du monde ?",
    answer1: "Autruche",
    answer2: "Condor",
    validAnswer: 1,
  },
  {
    question:
      "Quel animal est capable de survivre dans des environnements extrêmes, tels que les volcans sous-marins ?",
    answer1: "Limace de mer",
    answer2: "Tardigrade",
    validAnswer: 2,
  },
  {
    question:
      "Quel est l'oiseau capable de voler en arrière et de rester immobile dans l'air ?",
    answer1: "Colibri",
    answer2: "Faucon",
    validAnswer: 1,
  },
  {
    question: "Quel serpent est capable de cracher du venin sur ses proies ?",
    answer1: " Cobra",
    answer2: "Vipère",
    validAnswer: 1,
  },
  {
    question:
      "Quelle créature marine est souvent appelée -licorne des mers- en raison de sa longue corne torsadée ?",
    answer1: "Raie manta",
    answer2: "Narval",
    validAnswer: 2,
  },
  {
    question: "Quel est le plus grand reptile volant connu de l'histoire ?",
    answer1: "Quetzalcoatlus",
    answer2: "Archaeopteryx",
    validAnswer: 1,
  },
  {
    question: "Quel est le seul mammifère capable de vol actif ?",
    answer1: "Écureuil volant",
    answer2: "Chauve-souris",
    validAnswer: 2,
  },
  {
    question:
      "Quel insecte réalise la migration la plus longue par rapport à sa taille, parcourant des milliers de kilomètres ?",
    answer1: "Papillon monarque",
    answer2: "Criquet migrateur",
    validAnswer: 1,
  },
];

function Quizz() {
  const [refresh, setRefresh] = useState(0);
  const [count, setCount] = useState(0);

  const incrementCount = (cardId, isRight) => {
    const score = isRight ? count + 1 : count;
    // update of state with a new value
    setCount(score);

    // forcing pages to refresh if the score didn't change
    setRefresh(refresh + 1);

    // get div element from HTML page to put the score inside
    const divScore = document.getElementById("score");
    divScore.innerHTML = score;

    // changed element of answer array into correct
    answerBullets[cardId - 1] = isRight ? "correct" : "notcorrect";

    // store the score in the local storage
    localStorage.setItem("quizzScore", score.toString());
  };

  const handleClick1 = () => {
    const div = document.getElementById("card1");
    div.classList.remove("cardsHide"); // remove hide CSS to show the card
  };
  const handleClick2 = () => {
    const div = document.getElementById("card2");
    div.classList.remove("cardsHide");
  };
  const handleClick3 = () => {
    const div = document.getElementById("card3");
    div.classList.remove("cardsHide");
  };
  const handleClick4 = () => {
    const div = document.getElementById("card4");
    div.classList.remove("cardsHide");
  };
  const handleClick5 = () => {
    const div = document.getElementById("card5");
    div.classList.remove("cardsHide");
  };

  return (
    <div>
      <div>score:</div>
      <div id="score">0</div>
      <h2>Quizz</h2>
      <button type="submit" onClick={handleClick1}>
        1{" "}
      </button>
      <div id="card1" className="cardsHide">
        <CardQuizz
          question={quizzAnimal[0].question}
          answer1={quizzAnimal[0].answer1}
          answer2={quizzAnimal[0].answer2}
          validAnswer={quizzAnimal[0].validAnswer}
          input1="input1"
          input2="input2"
          incrementCount={incrementCount}
          buttonValidate="buttonValidate1"
          id={1}
        />
      </div>
      <button type="submit" onClick={handleClick2}>
        2{" "}
      </button>
      <div id="card2" className="cardsHide">
        <CardQuizz
          question={quizzAnimal[1].question}
          answer1={quizzAnimal[1].answer1}
          answer2={quizzAnimal[1].answer2}
          validAnswer={quizzAnimal[1].validAnswer}
          input1="input3"
          input2="input4"
          incrementCount={incrementCount}
          buttonValidate="buttonValidate2"
          id={2}
        />
      </div>
      <button type="submit" onClick={handleClick3}>
        3{" "}
      </button>
      <div id="card3" className="cardsHide">
        <CardQuizz
          question={quizzAnimal[2].question}
          answer1={quizzAnimal[2].answer1}
          answer2={quizzAnimal[2].answer2}
          validAnswer={quizzAnimal[2].validAnswer}
          input1="input5"
          input2="input6"
          incrementCount={incrementCount}
          buttonValidate="buttonValidate3"
          id={3}
        />
      </div>
      <button type="submit" onClick={handleClick4}>
        4{" "}
      </button>
      <div id="card4" className="cardsHide">
        <CardQuizz
          question={quizzAnimal[3].question}
          answer1={quizzAnimal[3].answer1}
          answer2={quizzAnimal[3].answer2}
          validAnswer={quizzAnimal[3].validAnswer}
          input1="input7"
          input2="input8"
          incrementCount={incrementCount}
          buttonValidate="buttonValidate4"
          id={4}
        />
      </div>
      <button type="submit" onClick={handleClick5}>
        5{" "}
      </button>
      <div id="card5" className="cardsHide">
        <CardQuizz
          question={quizzAnimal[4].question}
          answer1={quizzAnimal[4].answer1}
          answer2={quizzAnimal[4].answer2}
          validAnswer={quizzAnimal[4].validAnswer}
          input1="input9"
          input2="input10"
          incrementCount={incrementCount}
          buttonValidate="buttonValidate5"
          id={5}
        />
      </div>
      <AnswerBillesComponent answers={answerBullets} />
    </div>
  );
}

export default Quizz;
