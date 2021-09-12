import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BreakBar from "./BreakBar";
import CompletedDots from "./CompletedDots";
import DrainBar2 from "./DrainBar";

const DrainBar = styled.div`
  width: 100%;
  // background-color: blue;
  background: #134e5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #71b280,
    #134e5e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: ${(props) => props.height}%;
  position: absolute;
  bottom: 0;
  z-index: -1;
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  color: white;
  z-index: 100000;
  grid-area: center;
  margin: 5%;
  border-radius: 5%;
  max-width: 200px;
  font-size: 2em;
  font-family: system-ui;
  font-weight: 100;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 1fr 10% 1fr 10%;
  grid-template-areas:
    "top"
    "."
    "center"
    "."
    "bottom";
  align-items: center;
  justify-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const Drainer = ({ minutes, breakMinutes = 2 }) => {
  const timerInSeconds = minutes * 6;
  const breakInSeconds = breakMinutes * 6;

  const [seconds, setSeconds] = useState(timerInSeconds);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [countOfCompleted, setCount] = useState(0);
  const [intervalID, setIntervalID] = useState(0);

  function handleStartPom() {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(0);
    }

    const newIntervalID = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    setIntervalID(newIntervalID);
  }

  function handleStartBreak() {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(0);
    }

    const newIntervalID = setInterval(() => {
      setBreakSeconds((prev) => prev + 1);
    }, 1000);
    setIntervalID(newIntervalID);
  }

  useEffect(() => {
    if (seconds == 0) {
      completePom();
      setSeconds(timerInSeconds);
    }
  }, [seconds]);

  useEffect(() => {
    if (breakSeconds == breakInSeconds) {
      completePom();
      setBreakSeconds(0);
    }
  }, [breakInSeconds, breakSeconds]);

  const completePom = () => {
    clearInterval(intervalID);
    setIntervalID(0);
    !isBreak && setCount(countOfCompleted + 1);
    setIsBreak(!isBreak);
  };

  const isActive = !!intervalID;

  return (
    <GridContainer>
      {isBreak ? (
        <BreakBar
          isActive={isActive}
          minutes={breakMinutes}
          seconds={breakSeconds}
          totalSeconds={breakInSeconds}
        />
      ) : (
        <DrainBar2
          isActive={isActive}
          minutes={minutes}
          seconds={seconds}
          totalSeconds={timerInSeconds}
        />
      )}
      {/* <DrainBar height={(seconds / (isBreak ? breakInSeconds : timerInSeconds)) * 100} isBreak /> */}
      {/* <DrainBar2 isActive={isActive} minutes={minutes} complete={completePom} /> */}
      {/* <StyledButton onClick={toggle}>{`${isActive ? 'Pause' : 'Start'} ${periodName}`}</StyledButton> */}
      {isActive ? (
        <StyledButton onClick={() => console.log("pause")}>
          {isBreak ? breakInSeconds - breakSeconds : seconds}
        </StyledButton>
      ) : (
        <StyledButton onClick={isBreak ? handleStartBreak : handleStartPom}>
          {isBreak ? "Start Break" : "Start"}
        </StyledButton>
      )}
      <CompletedDots countCompleted={countOfCompleted + 19} />
    </GridContainer>
  );
};
