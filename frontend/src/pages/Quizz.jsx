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

  useEffect(() => {
    localStorage.setItem("totalScore", count.toString());
  }, [count]);

  const [answerBullets, setAnswerBullets] = useState(Array(10).fill(""));

  const incrementCount = (cardId, isRight) => {
    if (isRight) {
      setCount((prevCount) => Math.min(prevCount + 1, 30));
      answerBullets[cardId - 1] = "correct";
    } else {
      answerBullets[cardId - 1] = "notcorrect";
    }
    // get div element from HTML page to put the score inside
    const divScore = document.getElementById("score");
    divScore.innerHTML = count.toString();

    // changed element of answer array into correct
    const updatedBullets = [...answerBullets];
    updatedBullets[cardId - 1] = isRight ? "correct" : "notcorrect";
    setAnswerBullets(updatedBullets);

    if (cardId === 10) {
      const divResults = document.getElementById("divResults");
      divResults.classList.remove("cardsHide");
    }

    // store the score in the local storage
    localStorage.setItem("totalScore", count.toString());
  };

  return (
    <div>
      <div className="headerQuizz">
        <Link to="/Menu" className="leaveQuizz">
          {" "}
          Quitter
        </Link>
        <p className="levelQuizz">Niveau 3: Jeu de définitions</p>
        <div className="scoreQuizz">
          <div>Score:</div>
          <div id="score">0</div>
        </div>
      </div>
      <div className="pageContainer">
        <CardQuizz incrementCount={incrementCount} />
      </div>
      <div className="pageContainer">
        <div id="divResults" className="cardsHide">
          <Results score={count} level={3} />
        </div>
      </div>
      <div className="pageContainer">
        <AnswerBillesComponent answers={answerBullets} />
      </div>
    </div>
  );
}

export default Quizz;

// function Quizz() {
//   // const [refresh, setRefresh] = useState(0);
//   const [count, setCount] = useState(() => {
//     const storedScore = localStorage.getItem("totalScore");
//     const parsedScore = storedScore ? parseInt(storedScore, 10) : 20;
//     return Number.isNaN(parsedScore) ? 20 : Math.max(parsedScore, 20);
//   });

//   useEffect(() => {
//     localStorage.setItem("totalScore", count.toString());
//   }, [count]);

//   const [answerBullets, setAnswerBullets] = useState(
//     Array(quizzAnimal.length).fill("")
//   );

//   const incrementCount = (cardId, isRight) => {
//     if (isRight) {
//       setCount((prevCount) => Math.min(prevCount + 1, 30));
//       answerBullets[cardId - 1] = "correct";
//     } else {
//       answerBullets[cardId - 1] = "notcorrect";
//     }
//     // get div element from HTML page to put the score inside
//     const divScore = document.getElementById("score");
//     divScore.innerHTML = count.toString();

//     // changed element of answer array into correct
//     const updatedBullets = [...answerBullets];
//     updatedBullets[cardId - 1] = isRight ? "correct" : "notcorrect";
//     setAnswerBullets(updatedBullets);

//     // store the score in the local storage
//     localStorage.setItem("totalScore", count.toString());
//   };

//   const handleClick1 = () => {
//     const div = document.getElementById("card1");
//     div.classList.remove("cardsHide"); // remove hide CSS to show the card
//     const container = document.getElementById("scroll1");
//     container.scrollIntoView(); // a method that scrolls the page so as to make the element visible.
//   };
//   const handleClick2 = () => {
//     const div = document.getElementById("card2");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll2");
//     container.scrollIntoView();
//   };
//   const handleClick3 = () => {
//     const div = document.getElementById("card3");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll3");
//     container.scrollIntoView();
//   };
//   const handleClick4 = () => {
//     const div = document.getElementById("card4");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll4");
//     container.scrollIntoView();
//   };
//   const handleClick5 = () => {
//     const div = document.getElementById("card5");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll5");
//     container.scrollIntoView();
//   };
//   const handleClick6 = () => {
//     const div = document.getElementById("card6");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll6");
//     container.scrollIntoView();
//   };
//   const handleClick7 = () => {
//     const div = document.getElementById("card7");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll7");
//     container.scrollIntoView();
//   };
//   const handleClick8 = () => {
//     const div = document.getElementById("card8");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll8");
//     container.scrollIntoView();
//   };
//   const handleClick9 = () => {
//     const div = document.getElementById("card9");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll9");
//     container.scrollIntoView();
//   };
//   const handleClick10 = () => {
//     const div = document.getElementById("card10");
//     div.classList.remove("cardsHide");
//     const container = document.getElementById("scroll10");
//     container.scrollIntoView();
//   };

//   return (
//     <div>
//       <div className="headerQuizz">
//         <Link to="/Menu" className="leaveQuizz">
//           {" "}
//           Quitter
//         </Link>
//         <p className="levelQuizz">Niveau 3: Jeu de définitions</p>
//       </div>
//       <div className="scoreQuizz">
//         <div>Score:</div>
//         <div id="score">0</div>
//       </div>
//       <h3 className="instruction">
//         Lis la question et choisis la bonne réponse:
//       </h3>
//       <div id="scroll1" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick1}>
//           1{" "}
//         </button>
//         <div id="card1" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[0].question}
//             answer1={quizzAnimal[0].answer1}
//             answer2={quizzAnimal[0].answer2}
//             validAnswer={quizzAnimal[0].validAnswer}
//             input1="input1"
//             input2="input2"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate1"
//             id={1}
//           />
//         </div>
//       </div>
//       <div id="scroll2" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick2}>
//           2{" "}
//         </button>
//         <div id="card2" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[1].question}
//             answer1={quizzAnimal[1].answer1}
//             answer2={quizzAnimal[1].answer2}
//             validAnswer={quizzAnimal[1].validAnswer}
//             input1="input3"
//             input2="input4"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate2"
//             id={2}
//           />
//         </div>
//       </div>
//       <div id="scroll3" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick3}>
//           3{" "}
//         </button>
//         <div id="card3" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[2].question}
//             answer1={quizzAnimal[2].answer1}
//             answer2={quizzAnimal[2].answer2}
//             validAnswer={quizzAnimal[2].validAnswer}
//             input1="input5"
//             input2="input6"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate3"
//             id={3}
//           />
//         </div>
//       </div>
//       <div id="scroll4" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick4}>
//           4{" "}
//         </button>
//         <div id="card4" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[3].question}
//             answer1={quizzAnimal[3].answer1}
//             answer2={quizzAnimal[3].answer2}
//             validAnswer={quizzAnimal[3].validAnswer}
//             input1="input7"
//             input2="input8"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate4"
//             id={4}
//           />
//         </div>
//       </div>
//       <div id="scroll5" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick5}>
//           5{" "}
//         </button>
//         <div id="card5" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[4].question}
//             answer1={quizzAnimal[4].answer1}
//             answer2={quizzAnimal[4].answer2}
//             validAnswer={quizzAnimal[4].validAnswer}
//             input1="input9"
//             input2="input10"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate5"
//             id={5}
//           />
//         </div>
//       </div>
//       <div id="scroll6" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick6}>
//           6{" "}
//         </button>
//         <div id="card6" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[5].question}
//             answer1={quizzAnimal[5].answer1}
//             answer2={quizzAnimal[5].answer2}
//             validAnswer={quizzAnimal[5].validAnswer}
//             input1="input11"
//             input2="input12"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate6"
//             id={6}
//           />
//         </div>
//       </div>
//       <div id="scroll7" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick7}>
//           7{" "}
//         </button>
//         <div id="card7" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[6].question}
//             answer1={quizzAnimal[6].answer1}
//             answer2={quizzAnimal[6].answer2}
//             validAnswer={quizzAnimal[6].validAnswer}
//             input1="input13"
//             input2="input14"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate7"
//             id={7}
//           />
//         </div>
//       </div>
//       <div id="scroll8" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick8}>
//           8{" "}
//         </button>
//         <div id="card8" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[7].question}
//             answer1={quizzAnimal[7].answer1}
//             answer2={quizzAnimal[7].answer2}
//             validAnswer={quizzAnimal[7].validAnswer}
//             input1="input15"
//             input2="input16"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate8"
//             id={8}
//           />
//         </div>
//       </div>
//       <div id="scroll9" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick9}>
//           9{" "}
//         </button>
//         <div id="card9" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[8].question}
//             answer1={quizzAnimal[8].answer1}
//             answer2={quizzAnimal[8].answer2}
//             validAnswer={quizzAnimal[8].validAnswer}
//             input1="input17"
//             input2="input18"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate9"
//             id={9}
//           />
//         </div>
//       </div>
//       <div id="scroll10" className="buttonContainer">
//         <button type="submit" className="buttonCard" onClick={handleClick10}>
//           10{" "}
//         </button>
//         <div id="card10" className="cardsHide">
//           <CardQuizz
//             question={quizzAnimal[9].question}
//             answer1={quizzAnimal[9].answer1}
//             answer2={quizzAnimal[9].answer2}
//             validAnswer={quizzAnimal[9].validAnswer}
//             input1="input19"
//             input2="input20"
//             incrementCount={incrementCount}
//             buttonValidate="buttonValidate10"
//             id={10}
//           />
//         </div>
//       </div>
//       <AnswerBillesComponent answers={answerBullets} />
//     </div>
//   );
// }

// export default Quizz;
