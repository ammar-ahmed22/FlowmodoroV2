import React, { useContext, useEffect } from 'react';
import FlowContext from '../../contexts/FlowContext';
import { Box, Text, Flex } from "@chakra-ui/react"
import { secondsToTimeString } from '../../utils/time';



const Indicator = () => {

    const { isBreak, timeElapsed, breakTime } = useContext(FlowContext);
    const styleProps = {
        break: {
            main: {
                w: "100%",
                border: "2px",
                borderColor: "primary.300",
                h: "5vh",
                borderRadius: "md",
                align: "center"
            },
            movingBar: {
                bg: "primary.300",
                height: "5vh",
                borderRadius: "md",
                transition: "all .35s ease"
            }
        },
        work: {
            main: {
                w: "100%",
                textAlign: "start"
            },
            text: {
                color: "primary.300",
            },
            textSpan: {
                as: "span",
                bg: "primary.300",
                color: "gray.800",
                p: 1,
                borderRadius: "md"
            }
        }
    }
    const calcBreakElapsedPercentage = (elapsed) => {
        const diff = breakTime - elapsed
        const percentDiff = diff / breakTime;

        const percent = 1 - percentDiff;

        return `${percent * 100}%`
    }


    if (isBreak){
        return (
            <Flex {...styleProps.break.main} >
                <Box w={calcBreakElapsedPercentage(timeElapsed)} {...styleProps.break.movingBar} ></Box>
            </Flex>
        );
    }else{
        return (
            <Box {...styleProps.work.main} >
                {
                    timeElapsed > 0 && (
                        <Text {...styleProps.work.text}><Text {...styleProps.work.textSpan} >{secondsToTimeString(Math.floor(timeElapsed / 5))}</Text> - current break time</Text>
                    )
                }
                
            </Box>
        )
    }
    
}

export default Indicator;
