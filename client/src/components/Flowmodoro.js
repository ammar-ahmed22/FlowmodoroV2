import React, { useState } from "react";
import "../css/Flowmodoro.css";

import Timer from "./Timer";
import Indicator from "./Indicator";

const Flowmodoro = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [workTime, setWorkTime] = useState(0);
  

  return (
    <section className="flowmodoro d-flex flex-column align-items-center" id="flowmodoro">
      {isBreak ? (
        <h5 className="text-light pb-4">
          You were able to work for{" "}
          <span className="text-primary">25m 10s</span> giving you{" "}
          <span className="text-primary">5m 2s</span> to rest. Keep it up!
        </h5>
      ) : (
        <h5 className="text-light pb-4">
          Time yourself working, your break time is calculated as a{" "}
          <span className="text-decoration-underline text-primary">ratio</span>{" "}
          of time worked
        </h5>
      )}

      
      <Timer
        isBreak={isBreak}
        isStarted={isStarted}
        hasStarted={elapsed > 0}
        elapsed={elapsed}
        workTime={workTime}
        state={{ setIsStarted, setElapsed, setIsBreak, setWorkTime }}
      />
      <Indicator isBreak={isBreak} elapsed={elapsed} workTime={workTime} />
    </section>
  );
};

export default Flowmodoro;
