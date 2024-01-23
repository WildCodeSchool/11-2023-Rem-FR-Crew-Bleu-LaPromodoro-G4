import "../style/Instructions.css";
import { useState } from "react";
import Instruction from "../assets/instructions.png";
import etape3 from "../assets/niveausuivant.png";
import etape2 from "../assets/ecoutefini.png";
import etape4 from "../assets/niveauxfini.png";

function Instructions() {
  const [popupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  return (
    <>
      <div className="container-instructions">
        <button
          type="button"
          className="instructions"
          onClick={togglePopup}
          style={{
            color: userTheme.backgroundColor,
            cursor: userTheme.crs,
          }}
        >
          Instructions
        </button>
        {popupOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2 className="titleEtapes">Instructions</h2>
              <div />
              <div className="etapes">
                <p>Etape 1: Selectionne un niveau</p>
                <img src={Instruction} alt="instruction" className="etape1" />
              </div>
              <div className="etapes">
                <p>Etape 2: Réussi le niveau à 100%</p>
                <img src={etape2} alt="etape2" className="etape2" />
              </div>
              <div className="etapes">
                <p>Etape 3: Débloque le niveau suivant</p>
                <img src={etape3} alt="etape3" className="etape3" />
              </div>
              <div className="etapes">
                <p>Etape 4: Termine les niveaux à 100%</p>
                <img src={etape4} alt="etape4" className="etape4" />
              </div>
            </div>
            {/* <button type="button" className="closePopup" onClick={togglePopup}>
              Close
            </button> */}
          </div>
        )}
        {/* <div className="gauge-place">
          
        </div> */}
      </div>
      {/* <div>
        <img src={Bar} alt="progress bar" className="bar" />
      </div> */}
    </>
  );
}

export default Instructions;
