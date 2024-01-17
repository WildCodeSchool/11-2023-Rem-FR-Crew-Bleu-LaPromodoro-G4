import "../style/Instructions.css";
import { useState } from "react";

function Instructions() {
  const [popupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <>
      <div className="container-instructions">
        <button type="button" className="instructions" onClick={togglePopup}>
          Instructions
        </button>
        {popupOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2 className="titleEtapes">Instructions</h2>
              <div className="etapes" />
              <p>Etape 1: Selectionne un niveau</p>
              <p>Etape 2: Réussi le niveau à 100%</p>
              <p>Etape 3: Débloque le niveau suivant</p>
              <p>Etape 4: Termine le jeu en remplissant la barre au maximum</p>
            </div>
            {/* <button type="button" className="closePopup" onClick={togglePopup}>
              Close
            </button> */}
          </div>
        )}
      </div>
      {/* <div>
        <img src={Bar} alt="progress bar" className="bar" />
      </div> */}
    </>
  );
}

export default Instructions;
