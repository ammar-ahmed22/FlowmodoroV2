import React, { useState } from "react";
import "../css/Clock.css";

import Timer from "./Timer";
import Controls from "./Controls";
import Indicator from "./Indicator";

const Clock = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [workTime, setWorkTime] = useState(0);
  

  return (
    <section className="clock d-flex flex-column align-items-center" id="clock">
      {isBreak ? (
        <h3 className="text-light">
          You were able to work for{" "}
          <span className="text-primary">25m 10s</span> giving you{" "}
          <span className="text-primary">5m 2s</span> to rest. Keep it up!
        </h3>
      ) : (
        <h3 className="text-light">
          Time yourself working, your break time is calculated as a{" "}
          <span className="text-decoration-underline text-primary">ratio</span>{" "}
          of time worked
        </h3>
      )}

      <Timer elapsed={elapsed} isBreak={isBreak} workTime={workTime} />
      <Controls
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

export default Clock;
