import React from "react";
import "../css/Clock.css"

import Timer from "./Timer";
import Controls from "./Controls";

const Clock = ({ isBreak }) => {
  return (
    <section className="clock d-flex flex-column align-items-center" id="clock">
      {isBreak ? (
        <h3 className="text-light">
          Time yourself working, your break time is calculated as a{" "}
          <span className="text-decoration-underline text-primary">ratio</span>{" "}
          of time worked
        </h3>
      ) : (
        <h3 className="text-light">
          You were able to work for{" "}
          <span className="text-primary">25m 10s</span> giving you{" "}
          <span className="text-primary">5m 2s</span> to rest. Keep it up!
        </h3>
      )}

        
        <Timer />
        <Controls isBreak={isBreak} isStarted={true}/>
    </section>
  );
};

export default Clock;
