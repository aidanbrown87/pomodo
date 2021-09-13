import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import BreakBar from "./BreakBar";
import CompletedDots from "./CompletedDots";
import DrainBar from "./DrainBar";
import { secondsDisplayAsMinutes } from "./Minutes";

const pulse = keyframes`
  0% {
    transform: scale(0.9);
  }

  70% {
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    transform: scale(0.9);
    opacity: 1;
  }
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
  ${({ isPaused }) =>
    isPaused &&
    css`
      animation: ${pulse} 1s linear infinite;
    `}
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

export const Drainer = ({ minutes = 25, breakMinutes = 5 }) => {
  const timerInSeconds = minutes * 60;
  const breakInSeconds = breakMinutes * 60;

  const [seconds, setSeconds] = useState(timerInSeconds);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [countOfCompleted, setCount] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  function handleStartPom() {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(0);
      setIsPaused(false);
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
      setIsPaused(false);
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

  const handlePaused = () => {
    if (isPaused) {
      isBreak ? handleStartBreak() : handleStartPom();
    } else {
      clearInterval(intervalID);
      setIsPaused(true);
    }
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
        <DrainBar
          isActive={isActive}
          minutes={minutes}
          seconds={seconds}
          totalSeconds={timerInSeconds}
        />
      )}
      {isActive || isPaused ? (
        <StyledButton onClick={handlePaused} isPaused={isPaused}>
          {secondsDisplayAsMinutes(
            isBreak ? breakInSeconds - breakSeconds : seconds
          )}
        </StyledButton>
      ) : (
        <StyledButton onClick={isBreak ? handleStartBreak : handleStartPom}>
          {isBreak ? "Start Break" : "Start"}
        </StyledButton>
      )}
      <CompletedDots countCompleted={countOfCompleted} />
    </GridContainer>
  );
};
