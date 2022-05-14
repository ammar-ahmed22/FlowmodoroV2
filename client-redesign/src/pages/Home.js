import React from 'react';
import Page from '../components/Page';
import { Text, Button, useColorMode } from "@chakra-ui/react";
import Timer from '../components/Timer/Timer';
import Todo from '../components/Todo/Todo';

const Home = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Page>
            <Button onClick={toggleColorMode}>Switch Color Mode</Button>
            <Text textAlign="center" fontSize="xl">Time yourself working, your break time is calculated as a <Text as="span" color="primary.300" >ratio</Text> of time worked.</Text>
            <Timer />
            <Todo />
        </Page>
    );
}

export default Home;
