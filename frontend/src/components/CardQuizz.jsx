import React from "react";
import "../style/CardQuizz.css";
import PropTypes from "prop-types";

function CardQuizz({
  question,
  answer1,
  answer2,
  validAnswer,
  input1,
  input2,
  incrementCount,
  buttonValidate,
}) {
  CardQuizz.propTypes = {
    question: PropTypes.string.isRequired,
    answer1: PropTypes.string.isRequired,
    answer2: PropTypes.string.isRequired,
    validAnswer: PropTypes.number.isRequired,
    input1: PropTypes.string.isRequired,
    input2: PropTypes.string.isRequired,
    incrementCount: PropTypes.func.isRequired,
    buttonValidate: PropTypes.string.isRequired,
  };
  const handleClick = () => {
    const choice1 = document.getElementById(input1);
    const choice2 = document.getElementById(input2);
    const buttonElement = document.getElementById(buttonValidate);
    buttonElement.classList.add("cardsHide");

    if (
      (choice1.checked === true && validAnswer === 1) ||
      (choice2.checked === true && validAnswer === 2)
    ) {
      incrementCount();
    } else {
      // eslint-disable-next-line no-restricted-syntax
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
        <button id={buttonValidate} type="submit" onClick={handleClick}>
          Valider
        </button>
      </div>
    </div>
  );
}

export default CardQuizz;
