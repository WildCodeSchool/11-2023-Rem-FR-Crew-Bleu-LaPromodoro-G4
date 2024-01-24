import React, { useState } from "react";
import "../style/EndComponent.css";
import { Link } from "react-router-dom";

function EndComponent() {
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="end-component">
      <h1>
        Félicitation <br /> Tu as atteint les 40 points !{" "}
      </h1>

      <Link to="/">
        <button
          type="button"
          className="btn-restart"
          onClick={clearLocalStorage}
        >
          Revenir au menu
        </button>
      </Link>
    </div>
  );
}

export default EndComponent;
