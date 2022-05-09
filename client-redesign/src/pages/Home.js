import React, { useContext } from 'react';
import Page from '../components/Page';
import { Text, Button } from "@chakra-ui/react";
import FlowContext from '../contexts/FlowContext';
import useStopwatch from '../hooks/useStopwatch';

const Home = () => {

    const { isBreak, toggleIsBreak, workTimeElapsed, setWorkTimeElapsed } = useContext(FlowContext);

    const [ elapsed, start, stopStopwatch, resetStopwatch ] = useStopwatch();

    return (
        <Page>
            <Text textAlign="center" fontSize="2xl">Time yourself working, your break time is calculated as a <Text as="span" color="primary" >ratio</Text> of time worked.</Text>
            <Text>isBreak: {isBreak.toString()}</Text>
            <Button onClick={e => toggleIsBreak()}>Toggle isBreak</Button>
            <Text>workTimeElapsed: {workTimeElapsed}</Text>
            <Button onClick={e => setWorkTimeElapsed(20)}>Set Work Time Elapsed</Button>
            <Text>elapsed: {elapsed}</Text>
            <Button onClick={e => start( elapsed => {
                setWorkTimeElapsed(elapsed)
            })}>Start</Button>
            <Button onClick={e => stopStopwatch()}>Stop</Button>
            <Button onClick={e => resetStopwatch( elapsed => {
                setWorkTimeElapsed(elapsed)
            })}>Reset</Button>
        </Page>
    );
}

export default Home;
