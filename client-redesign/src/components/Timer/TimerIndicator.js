import React, { useContext, useEffect } from 'react';
import FlowContext from '../../contexts/FlowContext';
import { Box, Text, Flex } from "@chakra-ui/react"
import { secondsToHMS } from '../../utils/time';


const TimerIndicator = () => {

    const { isBreak, timeElapsed, workTime, breakTime } = useContext(FlowContext);

    // useEffect(() => {
    //     console.log({ workTime, breakTime })
    // }, [breakTime, workTime])

    const breakTimeToDisplay = (secs) => {
        const { h, m, s } = secondsToHMS(secs);

        let values = [
            {
                value: parseInt(h),
                type: 'h'
            },
            {
                value: parseInt(m),
                type: "m"
            },
            {
                value: parseInt(s),
                type: "s"
            }
        ];

        let nonZeroValues = values.filter( item => item.value );

        let result = nonZeroValues.map( item => {
            return `${item.value}${item.type}`
        }).join(" ");
        
        if (nonZeroValues.length === 0){
            return '0s'
        }

        return result

    }

    const calcBreakElapsedPercentage = (elapsed) => {
        const diff = breakTime - elapsed
        const percentDiff = diff / breakTime;

        const percent = 1 - percentDiff;

        return `${percent * 100}%`
    }


    if (isBreak){
        return (
            <Flex w="100%" border="2px" borderColor="primary" h="5vh" borderRadius="md" align="center" >
                <Box w={calcBreakElapsedPercentage(timeElapsed)} bg="primary" height="5vh" borderRadius="md" transition="all .35s ease" ></Box>
            </Flex>
        );
    }else{
        return (
            <Box w="100%" textAlign="start">
                {
                    timeElapsed > 0 && (
                        <Text color="primary"><Text as="span" bg="primary" color="gray.800" p="1" borderRadius="md">{breakTimeToDisplay(Math.floor(timeElapsed / 5))}</Text> - current break time</Text>
                    )
                }
                
            </Box>
        )
    }
    
}

export default TimerIndicator;
