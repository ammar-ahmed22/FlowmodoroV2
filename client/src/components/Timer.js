import React, { useState } from "react";
import "../css/Controls.css";

import ReactTooltip from "react-tooltip";

import Stopwatch from "../utils/Stopwatch";
import Clock from "./Clock";
import Navigation from "./Navigation";

//Handles all the controls for the stopwatch/timer
const Timer = ({
  isStarted,
  isBreak,
  hasStarted,
  state,
  elapsed,
  workTime,
  children,
}) => {
  // setInterval ID
  const [IID, setIID] = useState();

  const { setIsStarted, setElapsed, setIsBreak, setWorkTime } = state;

  // class created to handle timer logic
  const stopwatch = new Stopwatch(setElapsed, setIID);

  // Handling click of play/pause
  const playPauseHandler = (e) => {
    // timer is not started
    if (!isStarted) {
      // toggle
      setIsStarted((isStarted) => (isStarted ? false : true));

      // start the timer
      stopwatch.start();
    } else {
      // toggle
      setIsStarted((isStarted) => (isStarted ? false : true));

      // stop the timer
      stopwatch.stop(IID);
    }
  };

  const resetHandler = (e) => {
    // if reset, timer is stopped
    setIsStarted(false);
    stopwatch.reset(IID);
  };

  const modeSwitchHandler = (e) => {
    // switch to countdown mode
    setIsStarted(false);
    setIsBreak((isBreak) => (isBreak ? false : true));
    setWorkTime(elapsed);
    stopwatch.reset(IID);
  };

  if (isBreak) {
    if (workTime - elapsed <= 0) {
      stopwatch.stop(IID);
    }
  }

  return (
    <>
      <Navigation isBreak={isBreak} modeSwitcher={modeSwitchHandler} />
      <Clock elapsed={elapsed} isBreak={isBreak} workTime={workTime} />
      <div className="controls">
        <ReactTooltip place="bottom" />
        <button
          className={
            isStarted || hasStarted
              ? "btn text-primary mx-3 p-0 fs-5"
              : "d-none"
          }
          data-tip="Reset"
          onClick={resetHandler}
        >
          <i className="fas fa-undo-alt"></i>
        </button>
        <button
          className="btn text-primary mx-3 p-0 fs-5"
          data-tip={isStarted ? "Pause" : "Play"}
          onClick={playPauseHandler}
        >
          {isStarted ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        <button
          className="btn text-primary mx-3 p-0 fs-5"
          data-tip={isBreak ? "Back to Work" : "Break Time"}
          onClick={modeSwitchHandler}
        >
          {isBreak ? (
            <i className="fas fa-briefcase"></i>
          ) : (
            <i className="fas fa-bed"></i>
          )}
        </button>
      </div>
    </>
  );
};

export default Timer;
