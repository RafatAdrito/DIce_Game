import { useState,useEffect } from "react";
import StartGame from "./components/StartGame";
import GamePlay from "./components/GamePlay";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  };

  useEffect(() => {
    const confirmExit = (e) => {
      if (isGameStarted) {
        e.returnValue = "Are you sure you want to exit?";
      }
    };

    window.addEventListener("beforeunload", confirmExit);

    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, [isGameStarted]);

  return (
    <>{isGameStarted ? <GamePlay /> : <StartGame toggle={toggleGamePlay} />}</>
  );
}

export default App;
