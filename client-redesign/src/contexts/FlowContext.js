import React, { useState, useContext, createContext } from "react";

const FlowContext = createContext();

const FlowProvider = ({ children }) => {

    const [state, setState] = useState({
        isBreak: false,
        toggleIsBreak: () => setState( prev => ({
            ...prev,
            isBreak: prev.isBreak ? false : true,
        })),
        workTimeElapsed: 0,
        setWorkTimeElapsed: time => setState( prev => ({
            ...prev,
            workTimeElapsed: time,
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
