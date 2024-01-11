import "./style/Instructions.css";
import { useState } from "react";

import Bar from "../assets/bar.png";

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
              <h2>Mon Profil</h2>
              <h2>Instructions</h2>
            </div>
            {/* <button type="button" className="closePopup" onClick={togglePopup}>
              Close
            </button> */}
          </div>
        )}
      </div>
      <div>
        <img src={Bar} alt="progress bar" className="bar" />
      </div>
    </>
  );
}

export default Instructions;
