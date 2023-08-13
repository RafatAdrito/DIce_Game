import styled from "styled-components";
import NumberSelector from "./NumberSelector";
import TotalScore from "./TotalScore";
import RoleDice from "./RoleDice";
import { useState, useEffect } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";

const GamePlay = () => {
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }

    const randomNumber = generateRandomNumber(1, 7);
    setCurrentDice((prev) => randomNumber);

    if (selectedNumber === randomNumber) {
      setScore((prev) => prev + randomNumber);
    } else {
      setScore((prev) => prev - 2);
    }

    setSelectedNumber(undefined);
  };

  const resetScore = () => {
    setScore(0);
  };

  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", confirmExit);

    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <MainContainer isDarkMode={isDarkMode} showRules={showRules}>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          error={error}
          setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      <RoleDice currentDice={currentDice} roleDice={roleDice} />
      <div className="btns">
        <OutlineButton onClick={resetScore}>Reset Score</OutlineButton>
        <Button onClick={() => setShowRules(true)}>Show Rules</Button>
        <Button onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {showRules && (
        <RulesContainer>
          <Rules />
          <OutlineButton onClick={() => setShowRules(false)}>Close</OutlineButton>
        </RulesContainer>
      )}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => (props.isDarkMode ? "#1E1E1E" : "white")};
  color: ${(props) => (props.isDarkMode ? "white" : "black")}; /* Scrollable only when rules are visible */
  .top_section {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }
  .btns {
    margin-top: 40px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const RulesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

