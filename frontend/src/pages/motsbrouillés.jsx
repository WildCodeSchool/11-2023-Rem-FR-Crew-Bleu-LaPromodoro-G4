import React, { useState, useEffect } from "react";

function JeuOrdreLettres() {
  const [mot, setMot] = useState("");
  const [reponseUtilisateur, setReponseUtilisateur] = useState("");
  const [resultat, setResultat] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenirMotAleatoire = () => {
      const mots = ["chat", "poulet", "bonjour"];
      const motAleatoire = mots[Math.floor(Math.random() * mots.length)];

      return motAleatoire;
    };

    // Inicia o jogo obtendo uma palavra aleatória
    setMot(obtenirMotAleatoire());
    setIsLoading(false);
  }, []);

  const verificationReponse = () => {
    const reponseCorrecte = mot.split("").sort().join("");

    if (reponseUtilisateur === reponseCorrecte) {
      setResultat("Bravo !");
    } else {
      setResultat("Réessayez.");
    }
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Jeu d'Ordre de Lettres</h1>
      <p>Ordre des lettres: {mot.split("").join(" ")}</p>
      <label htmlFor="saisieOrdre">Saisissez la bonne ordre:</label>
      <input
        id="saisieOrdre"
        type="text"
        value={reponseUtilisateur}
        onChange={(e) => setReponseUtilisateur(e.target.value)}
      />
      <button type="button" onClick={verificationReponse}>
        Vérifier
      </button>
      <p>{resultat}</p>
    </div>
  );
}

export default JeuOrdreLettres;
