import React from 'react';
import "../css/Controls.css";

import ReactTooltip from 'react-tooltip';

const Controls = ({ isStarted, isBreak }) => {

    

    return (
        <div className="controls">
            <ReactTooltip place="bottom"/>
            {isStarted && <button className="btn text-primary mx-3 p-0 fs-5" data-tip="Reset"><i className="fas fa-undo-alt"></i></button>}
            <button className="btn text-primary mx-3 p-0 fs-5" data-tip={isStarted ? "Pause" : "Play"}>{isStarted ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button>
            <button className="btn text-primary mx-3 p-0 fs-5" data-tip={isBreak ? "Break Time" : "Back to Work"}>{isBreak ? <i className="fas fa-bed"></i> : <i className="fas fa-briefcase"></i>}</button>
        </div>
    );
}

export default Controls;
