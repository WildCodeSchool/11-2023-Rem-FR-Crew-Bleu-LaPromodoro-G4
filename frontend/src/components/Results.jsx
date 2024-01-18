import PropTypes from "prop-types";
import "../style/Results.css";

function Results({ score }) {
  return (
    <div className="myResult">
      <h2 className="titleResult">Niveau 1</h2>
      <h2 className="spanResult">Écoute fini !</h2>
      <div className="scoreResult">{score} points</div>
    </div>
  );
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
};
export default Results;
