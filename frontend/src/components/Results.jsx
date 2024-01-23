import PropTypes from "prop-types";
import { useState } from "react";
import "../style/Results.css";

function Results({ score, level }) {
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  return (
    <div className="myResult">
      <h2 className="spanResult">{level}</h2>
      <div
        className="scoreResult"
        style={{
          color: userTheme.color,
          backgroundColor: userTheme.backgroundColor,
        }}
      >
        {score} points
      </div>
    </div>
  );
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
};
export default Results;
