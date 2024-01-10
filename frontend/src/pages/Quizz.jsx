import React from "react";
import { useState } from "react";
import CardQuizz from "../components/CardQuizz";

const quizzAnimal = [
  {
    question: "Qu'est-ce qu'un animal arboricole ?",
    wrongAnswer: "An animal qui mangent les feuilles.",
    rightAnswer: "An animal qui vit dans les arbres.",
  },
  {
    question: "Quel animal est doté d'un exosquelette ?",
    wrongAnswer: "Méduse",
    rightAnswer: "Tortue",
  },
  {
    question:
      "Lequel de ces oiseaux n'est pas réputé pour être un charognard ?",
    wrongAnswer: "Le corbeau",
    rightAnswer: "La sarcelle",
  },
];

function Quizz() {
  //  const [display, setDisplay] = useState();

  const handleClick1 = () => {
    console.log("kuku");
    const div = document.getElementById("card1");
    div.classList.remove("cardsHide");
  };
  const handleClick2 = () => {
    console.log("kuku2");
    const div = document.getElementById("card2");
    div.classList.remove("cardsHide");
  };
  const handleClick3 = () => {
    console.log("kuku3");
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
          q={quizzAnimal[0].question}
          r={quizzAnimal[0].rightAnswer}
          w={quizzAnimal[0].wrongAnswer}
        />
      </div>
      <button type="submit" onClick={handleClick2}>
        2{" "}
      </button>
      <div id="card2" className="cardsHide">
        <CardQuizz 
        q={quizzAnimal[1].question}
        r={quizzAnimal[1].rightAnswer}
        w={quizzAnimal[1].wrongAnswer}
        />
      </div>
      <button type="submit" onClick={handleClick3}>
        3{" "}
      </button>
      <div id="card3" className="cardsHide">
        <CardQuizz />
      </div>
    </div>
  );
}

export default Quizz;
