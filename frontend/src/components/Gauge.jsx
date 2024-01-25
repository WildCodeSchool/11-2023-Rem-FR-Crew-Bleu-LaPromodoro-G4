import React, { useState, useEffect } from "react";
import "../style/Gauge.css";

function Gauge() {
  const [score, setScore] = useState(
    parseInt(localStorage.getItem("totalScore"), 10) || 0
  );
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedScore = localStorage.getItem("totalScore");
      setScore(storedScore ? parseInt(storedScore, 10) : 0);
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const gaugeWidth = Math.min(100, (score / 40) * 100);

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
