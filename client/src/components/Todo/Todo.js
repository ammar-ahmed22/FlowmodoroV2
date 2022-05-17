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

    useEffect(() => {
        
        const ids = tasks.map(task => task._id)

        
    }, [tasks])

    
    
    const fakeData = [
        {
            _id: "3453493858",
            name: "Co-op applications",
            notes: "-Go through all postings and add to shortlist\n-Add shortlist items to Notion\n-Apply to all",
            completed: false,
            subtasks: [
                {
                    name: "Go through all postings and add to shortlist",
                    completed: true,
                    _id: "3485983495"
                },
                {
                    name: "Add shortlist items to Notion",
                    completed: true,
                    _id: "93845884578"
                },
                {
                    name: "Apply to all",
                    completed: false,
                    _id: "39456435684"
                }
            ]
        },
        {
            _id: "3845894856",
            name: "NE 242 Lab Report",
            completed: true,
            notes: null,
            subtasks: []
        }
    ]

    const [data, setData] = useState(fakeData);

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

                    return <Task key={_id} task={task}  />
                })
            }
            <EditableTask setData={setData} />
        </Box>
    );
}

export default Todo;
