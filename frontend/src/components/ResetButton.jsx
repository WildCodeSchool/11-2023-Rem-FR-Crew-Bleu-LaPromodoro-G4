import React, { useState, useEffect } from "react";
import "../style/Instructions.css";

function ResetButton() {
  const [totalScore, setTotalScore] = useState(
    parseInt(localStorage.getItem("totalScore"), 10) || 0
  );
  const userTheme = JSON.parse(localStorage.getItem("userTheme")) || {
    backgroundColor: "",
    crs: "auto",
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedScore = localStorage.getItem("totalScore");
      setTotalScore(storedScore ? parseInt(storedScore, 10) : 0);
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const resetTotalScore = () => {
    localStorage.setItem("totalScore", 0);
    setTotalScore(parseInt(localStorage.getItem("totalScore"), 10));
    window.location.reload();
  };

  if (totalScore < 40) {
    return null;
  }

  return (
    <div className="container-instructionsR">
      <button
        type="button"
        className="instructionsR"
        style={{
          color: userTheme.backgroundColor,
          cursor: userTheme.crs,
        }}
        onClick={resetTotalScore}
      >
        Réinitialiser Score
      </button>
    </div>
  );
}

export default ResetButton;
