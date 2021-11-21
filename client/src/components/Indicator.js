import React, { useEffect } from "react";
import "../css/Indicator.css";
import { displayCalcBreak } from "../utils/time";

const Indicator = ({ isBreak, elapsed, workTime }) => {
  useEffect(() => {
    if (isBreak) {
      const movingBar = document.querySelector(".moving-bar");
      const percentage = ((workTime - elapsed) / workTime) * 100;

      if (percentage !== 0) {
        movingBar.style.width = `${percentage}%`;
      } else {
        movingBar.style.display = "none";
      }
    }
  }, [isBreak, elapsed, workTime]);
  if (isBreak) {
    return (
      <div className="static-bar">
        <div className="moving-bar"></div>
      </div>
    );
  } else {
    // TODO: Make this time divided by ratio
    const display = displayCalcBreak(elapsed);
    return (
      <div className="curr-break">
        {(elapsed > 0) && <span className="text-primary">
          <span className="calc-break px-2 py-1">{display}</span> - current
            break time
        </span>}
      </div>
    );
  }
};

export default Indicator;
