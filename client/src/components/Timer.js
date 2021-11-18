import React from 'react';
import "../css/Timer.css";
import { secondsToHMS } from '../utils/time';

const Timer = ({ elapsed, isBreak, workTime }) => {

    
    
    const { hours, minutes, seconds } = secondsToHMS(isBreak ? (workTime - elapsed) : elapsed);
    return (
        <div className="timer d-flex justify-content-between">
            <div className="timer-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Hours</span>
                <span className="text-light fw-bold display-1">{hours}</span>
            </div>

            <div className="d-flex align-items-end">
                <span className="text-primary fw-bold display-1">.</span>
            </div>

            <div className="timer-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Minutes</span>
                <span className="text-light fw-bold display-1">{minutes}</span>
            </div>

            <div className="d-flex align-items-end">
                <span className="text-primary fw-bold display-1">.</span>
            </div>
            
            <div className="timer-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Seconds</span>
                <span className="text-light fw-bold display-1">{seconds}</span>
            </div>
        </div>
    );
}

export default Timer;
