import React, { useState } from "react";


const useStopwatch = () => {
    const [intervalID, setIntervalID] = useState();
    const [elapsed, setElapsed] = useState(0);

    const start = (callback=null) => {
        setIntervalID(
            setInterval(() => {
                setElapsed( elapsed => {
                    if (callback){
                        callback(elapsed + 1);
                    }
                    
                    return elapsed + 1
                });
                
            }, 1000)
        )

        //callback(elapsed)
    }

    const stop = () => {
        if (!intervalID){
            return;
        }

        clearInterval(intervalID);
    }

    const reset = (callback=null) => {
        stop(intervalID);
        setElapsed(0);
        if (callback){
            callback(0);
        }
    }
    return [
        elapsed,
        start,
        stop,
        reset
    ]
}


export default useStopwatch