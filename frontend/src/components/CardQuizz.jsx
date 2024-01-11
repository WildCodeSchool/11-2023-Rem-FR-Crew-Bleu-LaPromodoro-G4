import React from "react";
import "./CardQuizz.css";

function CardQuizz({ question, answer1, answer2, validAnswer, input1, input2 }) {
  const handleClick = () => {
    const choice1 = document.getElementById(input1);
    console.log(choice1);
    const choice2 = document.getElementById(input2);
    console.log(validAnswer);

    if (choice1.checked === true && validAnswer === 1) {
      console.log("bravo");
    } else if (choice2.checked === true && validAnswer === 2) {
      console.log("bravo");
    } else {
      console.log("perdu");
    }
  };

  return (
    <div className="questionCard">
      <p>{question}</p>

      <div>
        <input type="radio" id={input1} name="drone" value={input1} />
        <label htmlFor={input1}>{answer1}</label>
      </div>
      <div>
        <input type="radio" id={input2} name="drone" value={input2} />
        <label htmlFor={input2}>{answer2}</label>
      </div>

      <div>
        <button type="submit" onClick={handleClick}>
          Valider
        </button>
        <button type="submit">Question suivante</button>
      </div>
    </div>
  );
}

export default CardQuizz;
