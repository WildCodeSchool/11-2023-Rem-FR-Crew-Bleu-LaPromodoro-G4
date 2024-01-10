import React from "react";
import "./CardQuizz.css";

function CardQuizz({ q, r, w }) {
  return (
    <div className="questionCard">
      <p>{q}</p>

      <div>
        <input type="radio" id="q1" name="drone" value="q1" checked />
        <label htmlFor="q1">{r}</label>
      </div>
      <div>
        <input type="radio" id="q2" name="drone" value="q2" checked />
        <label htmlFor="q2">{w}</label>
      </div>
      
      <div>
        <button type="submit">Valider</button>
        <button type="submit">Question suivante</button>
      </div>
    </div>
  );
}

export default CardQuizz;
