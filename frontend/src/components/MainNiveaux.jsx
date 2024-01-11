import "./style/MainNiveaux.css";

function MainNiveaux() {
  return (
    <div className="container">
      <div className="niveau1">
        <h2>Niveau 1: Ecoute</h2>
        <button type="button" className="btnEnter1">
          Entrer
        </button>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock1"
        />
      </div>
      <div className="niveau2">
        <h2>Niveau 2: Synonymes</h2>
        <button type="button" className="btnEnter2">
          Entrer
        </button>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock2"
        />
      </div>
      <div className="niveau3">
        <h2 className="titleDefinition">Niveau 3: Définitions</h2>
        <button type="button" className="btnEnter3">
          Entrer
        </button>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock3"
        />
      </div>
      <div className="niveau4">
        <h2 className="titleDefinition">Niveau 4: ?????</h2>
        <button type="button" className="btnEnter4">
          Entrer
        </button>
        <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock4"
        />
      </div>
    </div>
  );
}

export default MainNiveaux;
