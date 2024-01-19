import PropTypes from "prop-types";
import "../style/Results.css";

function Results({ score, level }) {
  return (
    <div className="myResult">
      <h2 className="spanResult">{level}</h2>
      <div className="scoreResult">{score} points</div>
    </div>
  );
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
};
export default Results;
