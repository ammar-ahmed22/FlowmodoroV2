import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Button, HStack, VStack, Text, useColorModeValue, IconButton, Tooltip } from "@chakra-ui/react"
import FlowContext from '../../contexts/FlowContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useStopwatch from '../../hooks/useStopwatch';
import TimerNav from './TimerNav';
import TimerControls from './TimerControls';
import { secondsToHMS } from '../../utils/time';
import TimerIndicator from './TimerIndicator';


const Timer = () => {

    const { timeElapsed } = useContext(FlowContext);

   
    const styleProps = {
        timerNum: {
            fontSize: "7xl",
            fontWeight: "bold",
            lineHeight: "4.5rem"
        },
        timerLabel: {
            fontWeight: "light"
        },
        timerPeriod: {
            verticalAlign: "bottom",
            fontWeight: "bold",
            fontSize: "7xl",
            lineHeight: "4.5rem",
            marginInlineStart: "0 !important",
            color: "primary"
        }
    }


    

    
    // useEffect(() => {
    //     console.log({ timeElapsed })
    // }, [timeElapsed])


    

    return (
        <VStack align="center" mt="5" spacing={7}>
            <TimerNav />
            <HStack align="end" >
                <VStack align="center" >
                    <Text >Hours</Text>
                    <Text {...styleProps.timerNum} >{secondsToHMS(timeElapsed).h}</Text>
                </VStack>
                <Text {...styleProps.timerPeriod}  >.</Text>
                <VStack align="center">
                    <Text >Minutes</Text>
                    <Text {...styleProps.timerNum} >{secondsToHMS(timeElapsed).m}</Text>
                </VStack>
                <Text {...styleProps.timerPeriod} >.</Text>
                <VStack align="center">
                    <Text >Seconds</Text>
                    <Text {...styleProps.timerNum} >{secondsToHMS(timeElapsed).s}</Text>
                </VStack>
            </HStack>
            <TimerControls />
            <TimerIndicator />
        </VStack>
    );
}

export default Timer;
