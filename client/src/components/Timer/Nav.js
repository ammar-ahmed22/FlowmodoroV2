import React, { useContext } from 'react';
import FlowContext from '../../contexts/FlowContext';
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = () => {

    const { isBreak, toggleIsBreak, setWorkTime, setBreakTime, timeElapsed } = useContext(FlowContext);

    const bgColor = useColorModeValue("white", "gray.800")
    const primary = useColorModeValue("primary.600", "primary.200");
    const styleProps = {
        main: {
            w: "100%",
            mb: 5,
            border: "2px",
            borderColor: primary,
            borderRadius: "lg"
        },
        workBtn: {
            bg: isBreak ? "transparent" : primary,
            color: isBreak ? primary : bgColor,
            height: "100%",
            py: "1",
            _focus: {},
            _hover: {},
            leftIcon: <FontAwesomeIcon icon="briefcase"/>
        },
        breakBtn: {
            bg: isBreak ? primary : "transparent",
            color: isBreak ? bgColor : primary,
            height: "100%",
            py: "1",
            _focus: {},
            _hover: {},
            leftIcon: <FontAwesomeIcon icon="bed"/>
        },
    }

    const handleClick = (e) => {
        
        const buttonMode = e.target.textContent.toLowerCase()
        
        if (isBreak && buttonMode === "work"){
            setWorkTime(0);
            setBreakTime(0);
            toggleIsBreak()
        }

        if (!isBreak && buttonMode === "break" && Math.floor(timeElapsed / 5) >= 1){
            setWorkTime(timeElapsed);
            setBreakTime(Math.floor(timeElapsed / 5))
            toggleIsBreak()
        }
        
        
    }

    return (
        <Flex {...styleProps.main}>
            <Button w="100%" variant="ghost" {...styleProps.workBtn} onClick={handleClick} >Work</Button>
            <Button w="100%" variant="ghost" {...styleProps.breakBtn} onClick={handleClick}>Break</Button>
        </Flex>
    );
}

export default Nav;
