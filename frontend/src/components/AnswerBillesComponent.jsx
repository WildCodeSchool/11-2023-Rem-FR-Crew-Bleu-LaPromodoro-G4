import PropTypes from "prop-types";
import "../style/AnswerBillesComponent.css";

function AnswerBillesComponent({ answers }) {
  return (
    <div className="progress-container">
      {answers.map((answer, index) => {
        let billesClass = "answer-billes";
        let billesText = "";
        if (answer === "correct") {
          billesClass += " correct";
          billesText = "V";
        } else if (answer === "notcorrect") {
          billesClass += " notcorrect";
          billesText = "F";
        }
        const key = `${answer}-${index}`;
        return (
          <div key={key} className={billesClass}>
            {billesText}
          </div>
        );
      })}
    </div>
  );
}

AnswerBillesComponent.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerBillesComponent;
