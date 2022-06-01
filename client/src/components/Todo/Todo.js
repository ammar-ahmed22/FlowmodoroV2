import React, { useState, useContext, useEffect } from 'react';
import { Box, Text, Button } from "@chakra-ui/react"
import Task from './Task';
import EditableTask from './EditableTask';
import { TodoContext } from '../../contexts/TodoContext';
import useUserID from '../../hooks/useUserID';

const Todo = () => {

    const { id, tasks, setTasks } = useContext(TodoContext);

    const [userID, setUserID, removeUserID] = useUserID();

    // TEMPORARY (testing)
    useEffect(() => {
        setUserID("627fff10e1594b803ec08405")
    }, [])

    

    
    
    

    const [data, setData] = useState([]);

    const styleProps = {
        main: {
            mt: 8
        },
        title: {
            color: "primary.300",
            fontSize: "2xl",
            fontWeight: "bold"
        },
        completed: {
            color: "white",
            fontSize: "lg",
            fontWeight: "bold"
        }
    }

    return (
        <Box {...styleProps.main}>
            <Text {...styleProps.title}>Today's Tasks ({tasks.length})</Text>
            {/* {tasks && <Text {...styleProps.completed}>Completed: {tasks.filter( task => task.completed ).length}</Text>} */}
            {
                tasks instanceof Array && tasks.map( task => {
                    const { name, completed, notes, _id, subtasks } = task;

                    return <Task id={_id} task={task} key={_id} />
                })
            }
            <EditableTask setData={setData} />
        </Box>
    );
}

export default Todo;
