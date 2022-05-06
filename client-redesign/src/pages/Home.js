import React, { useContext } from 'react';
import Page from '../components/Page';
import { Text, Button } from "@chakra-ui/react";
import FlowContext from '../contexts/FlowContext';

const Home = () => {

    const { isBreak, toggleIsBreak, workTimeElapsed, setWorkTimeElapsed } = useContext(FlowContext);

    return (
        <Page>
            <Text textAlign="center" fontSize="2xl">Time yourself working, your break time is calculated as a <Text as="span" color="primary" >ratio</Text> of time worked.</Text>
            <Text>isBreak: {isBreak.toString()}</Text>
            <Button onClick={e => toggleIsBreak()}>Toggle isBreak</Button>
            <Text>workTimeElapsed: {workTimeElapsed}</Text>
            <Button onClick={e => setWorkTimeElapsed(20)}>Set Work Time Elapsed</Button>
        </Page>
    );
}

export default Home;
