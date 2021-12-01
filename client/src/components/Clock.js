import React from 'react';
import "../css/Clock.css";
import { secondsToHMS } from '../utils/time';

const Clock = ({ elapsed, isBreak, workTime, ratio }) => {

    
    
    const { hours, minutes, seconds } = secondsToHMS(isBreak ? (Math.floor(workTime / ratio) - elapsed) : elapsed);
    return (
        <div className="clock d-flex justify-content-between">
            <div className="clock-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Hours</span>
                <span className="text-light fw-bold display-1">{hours}</span>
            </div>

            <div className="d-flex align-items-end">
                <span className="text-primary fw-bold display-1">.</span>
            </div>

            <div className="clock-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Minutes</span>
                <span className="text-light fw-bold display-1">{minutes}</span>
            </div>

            <div className="d-flex align-items-end">
                <span className="text-primary fw-bold display-1">.</span>
            </div>
            
            <div className="clock-value d-flex flex-column align-items-center">
                <span className="text-light fw-light">Seconds</span>
                <span className="text-light fw-bold display-1">{seconds}</span>
            </div>
        </div>
    );
}

export default Clock;
