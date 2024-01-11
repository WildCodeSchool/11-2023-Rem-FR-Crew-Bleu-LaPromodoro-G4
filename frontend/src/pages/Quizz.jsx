import React from "react";
import { useState } from "react";
import CardQuizz from "../components/CardQuizz";

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
    question:
      "Lequel de ces oiseaux n'est pas réputé pour être un charognard ?",
    answer1: "Le corbeau",
    answer2: "La sarcelle",
    validAnswer: 2,
  },
];

function Quizz() {
  //  const [display, setDisplay] = useState();

  const handleClick1 = () => {
    const div = document.getElementById("card1");
    div.classList.remove("cardsHide");
  };
  const handleClick2 = () => {
    const div = document.getElementById("card2");
    div.classList.remove("cardsHide");
  };
  const handleClick3 = () => {
    const div = document.getElementById("card3");
    div.classList.remove("cardsHide");
  };

  return (
    <div>
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
        />
      </div>
    </div>
  );
}

export default Quizz;
