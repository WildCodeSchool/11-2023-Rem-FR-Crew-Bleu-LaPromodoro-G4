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
  id,
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
    id: PropTypes.number.isRequired,
  };
  const handleClick = () => {
    const choice1 = document.getElementById(input1); // to get the 1st html input object from return
    const choice2 = document.getElementById(input2); // to get the 2nd html input object from return
    const buttonElement = document.getElementById(buttonValidate);
    buttonElement.classList.add("cardsHide"); // making the button "validate" dissapear by adding CSS class

    if (
      (choice1.checked === true && validAnswer === 1) ||
      (choice2.checked === true && validAnswer === 2)
    ) {
      // as parameters: id as value of card passed in props, as 2nd parametres true or false, calling a function in parent with these values
      incrementCount(id, true);
    } else {
      incrementCount(id, false);
    }
  };

  return (
    <div className="questionCard">
      <p>{question}</p>

      <div>
        {/* using input1 et input2 to identify each input */}
        <input type="radio" id={input1} name="choice" value={input1} />
        <label htmlFor={input1}>{answer1}</label>
      </div>
      <div>
        <input type="radio" id={input2} name="choice" value={input2} />
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
