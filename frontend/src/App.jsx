import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Welcome</Link>
        <Link to="/menu">Profile</Link>
        <Link to="/level"> Level</Link>
        <Link to="/speech">Speech</Link>
        <Link to="/synonym">Synonim</Link>
        <Link to="/quizz">Quizz</Link>
        <Link to="/reward">Reward</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
