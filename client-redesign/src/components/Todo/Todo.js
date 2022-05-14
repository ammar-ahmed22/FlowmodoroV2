import React, { useState, useId } from 'react';
import { Box, Text, Button } from "@chakra-ui/react"
import Task from './Task';
import EditableTask from './EditableTask';

const Todo = () => {

    //const id = useId();
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
            <Text {...styleProps.title}>Today's Tasks ({data.length})</Text>
            <Text {...styleProps.completed}>Completed: {data.filter( task => task.completed ).length}</Text>
            {
                data && data.map( task => {
                    const { name, completed, notes, _id, subtasks } = task;

                    return <Task key={_id} name={name} completed={completed} notes={notes} id={_id} subtasks={subtasks} setData={setData} />
                })
            }
            <EditableTask setData={setData} />
        </Box>
    );
}

export default Todo;
