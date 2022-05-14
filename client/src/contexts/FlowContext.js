import React, { useState, useContext, createContext } from "react";

const FlowContext = createContext();

const FlowProvider = ({ children }) => {

    const [state, setState] = useState({
        isBreak: false,
        toggleIsBreak: () => setState( prev => ({
            ...prev,
            isBreak: prev.isBreak ? false : true,
        })),
        timeElapsed: 0,
        setTimeElapsed: time => setState( prev => ({
            ...prev,
            timeElapsed: time,
        })),
        workTime: 0,
        breakTime: 0,
        setWorkTime: time => setState( prev => ({
            ...prev,
            workTime: time
        })),
        setBreakTime: time => setState( prev => ({
            ...prev,
            breakTime: time
        }))
    })

    return (
        <FlowContext.Provider value={state} >
            {
                children
            }
        </FlowContext.Provider>
    )
}

export { FlowProvider };
export default FlowContext
