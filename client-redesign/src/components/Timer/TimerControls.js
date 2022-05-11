import React, { useContext, useState, useEffect } from 'react';
import FlowContext from '../../contexts/FlowContext';
import { HStack, Tooltip, IconButton } from "@chakra-ui/react";
import useStopwatch from '../../hooks/useStopwatch';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

const TimerControls = () => {

    const { isBreak, timeElapsed, setTimeElapsed, toggleIsBreak, setWorkTime, setBreakTime, breakTime } = useContext(FlowContext);

    const [elapsed, start, stop, reset, setElapsed] = useStopwatch();
    const [isStarted, setIsStarted] = useState(false);

    const stopwatchDir = isBreak ? -1 : 1;

    useEffect(() => {
        if (stopwatchDir === -1){
            console.log("going backwards")
            if (elapsed === 0){
                console.log("elaspsed is 0")
                setIsStarted(false)
                reset()
            }
        }
    }, [stopwatchDir, elapsed])

    useEffect(() => {
        if (isBreak){
            setIsStarted(false)
            stop()
            setWorkTime(timeElapsed);
            setBreakTime(Math.floor(timeElapsed / 5));
            setElapsed(Math.floor(timeElapsed / 5))
        }
        if (!isBreak){
            setIsStarted(false)
            stop();
            setWorkTime(0);
            setBreakTime(0);
        }
    }, [isBreak])

    const handleStart = (e) => {
        //toggleIsBreak();

        if (elapsed + stopwatchDir < 0){
            return;
        }

        setIsStarted(true);

        start(stopwatchDir, isBreak ? breakTime : 0);

    }

    const handlePause = e => {
        setIsStarted(false);
        stop();
    }

    const handleRestart = e => {
        setIsStarted(false);
        if (isBreak){
            reset(breakTime)
            setTimeElapsed(breakTime)
        }
        reset();
    }

    const handleModeSwitch = e => {
        setIsStarted(false);
        stop();
        toggleIsBreak()
    }

    return (
        <HStack pt="7">
                <Tooltip label="Restart" hasArrow bg="gray.800" color="white" >
                    <IconButton icon={<FontAwesomeIcon icon="arrow-rotate-left" />} disabled={isBreak ? timeElapsed === breakTime : timeElapsed === 0} variant="ghost" color="primary" fontSize="2xl" _hover={{ color: "white" }} onClick={handleRestart}/>
                </Tooltip>
                <Tooltip label={isStarted ? "Pause" : "Start"} hasArrow bg="gray.800" color="white" >
                    <IconButton icon={<FontAwesomeIcon icon={isStarted ? "pause" : "play"}/>} variant="ghost" color="primary" fontSize="2xl" _hover={{ color: "white" }} onClick={e => isStarted ? handlePause(e) : handleStart(e)}/>
                </Tooltip>
                <Tooltip label={isBreak ? "Work time" : "Break time"} hasArrow bg="gray.800" color="white" >
                    <IconButton icon={<FontAwesomeIcon icon={isBreak ? "briefcase" : "bed"}/>} disabled={!isBreak && Math.floor(timeElapsed / 5) < 1} variant="ghost" color="primary" fontSize="2xl" _hover={{ color: "white" }} onClick={handleModeSwitch} />
                </Tooltip>
                
                
        </HStack>
    );
}

export default TimerControls;
