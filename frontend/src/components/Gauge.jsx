import React, { useState, useEffect } from "react";
import "../style/Gauge.css";

function Gauge() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem("totalScore")) || 0;
    setScore(savedScore);
  }, []);
  const gaugeWidth = Math.min(100, (score / 30) * 100);

  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  return (
    <div>
      <div className="gauge-container">
        <div
          className="gauge"
          style={{
            width: `${gaugeWidth}%`,
            backgroundColor: userTheme.backgroundColor,
          }}
        />
      </div>
    </div>
  );
}

export default Gauge;
