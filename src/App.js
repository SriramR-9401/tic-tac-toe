import React, { useEffect } from "react";
import "./App.css";
import Game from "./Components/Game";

function App() {
  useEffect(() => {
    document.title = "Tic Tac Toe";
  }, []);
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
