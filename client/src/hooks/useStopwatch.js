import React, { useState, useContext, useEffect } from "react";
import FlowContext from "../contexts/FlowContext";


const useStopwatch = () => {
    const [intervalID, setIntervalID] = useState();
    const [elapsed, setElapsed] = useState(0);
    const { setTimeElapsed, timeElapsed } = useContext(FlowContext);
    // const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setTimeElapsed(elapsed);
    }, [elapsed])

    useEffect(() => {
        setElapsed(timeElapsed);
    }, [timeElapsed])

    
    const start = (direction) => {
        const secondLength = process.env.NODE_ENV === "development" ? 100 : 1000;
        
        setIntervalID(
            setInterval(() => {
                setElapsed( elapsed => {
                    
                    if (elapsed + direction === 0){
                        clearInterval(intervalID)
                    }
                    
                    return elapsed + direction
                });
                
            }, secondLength)
        )
    }

    const stop = () => {
        if (!intervalID){
            return;
        }
        clearInterval(intervalID);
    }

    const reset = (to=0) => {
        stop(intervalID);
        setElapsed(to);
    }
    return [
        elapsed,
        start,
        stop,
        reset,
        setElapsed
    ]
}


export default useStopwatch