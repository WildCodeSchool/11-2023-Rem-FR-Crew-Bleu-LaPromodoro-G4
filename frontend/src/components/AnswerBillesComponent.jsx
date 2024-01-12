import "../style/AnswerBillesComponent.css";
import PropTypes from "prop-types";

const AnswerBillesComponent = ({ answers }) => {
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
        return (
          <div key={index} className={billesClass}>
            {billesText}
          </div>
        );
      })}
    </div>
  );
};

AnswerBillesComponent.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerBillesComponent;
