import React from 'react';
import "../css/Timer.css";

const Timer = () => {
    return (
        <div className="timer d-flex justify-content-center">
            <div className="timer-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Hours</span>
                <span className="text-light fw-bold display-1">00</span>
            </div>

            <div className="d-flex align-items-end">
                <span className="text-primary fw-bold display-1">.</span>
            </div>

            <div className="timer-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Minutes</span>
                <span className="text-light fw-bold display-1">25</span>
            </div>

            <div className="d-flex align-items-end">
                <span className="text-primary fw-bold display-1">.</span>
            </div>
            
            <div className="timer-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Seconds</span>
                <span className="text-light fw-bold display-1">10</span>
            </div>
        </div>
    );
}

export default Timer;
