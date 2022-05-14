import React, { useEffect } from 'react';
import { Box, Checkbox, VStack, useColorModeValue, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const Task = ({ name, completed, notes, id, subtasks, setData }) => {

    const allChecked = subtasks.map( subtask => subtask.completed).every(Boolean);
    const isIndeterminate = subtasks.map( subtask => subtask.completed).some(Boolean) && !allChecked;

    useEffect(() => {
        
            setData( prev => {
                const copy = [...prev];

                const taskToUpdateIdx = prev.map( task => task._id).indexOf(id);

                copy[taskToUpdateIdx].completed = allChecked;

                return copy
            })
        

    }, [allChecked])

    const handleTaskChange = e => {

        setData( prev => {
            console.log(prev)
            // return prev;
            const copy = [...prev];

            const taskToUpdateIdx = prev.map( task => task._id).indexOf(id);
            const task = copy[taskToUpdateIdx];

            copy[taskToUpdateIdx].completed = e.target.checked;

            if (subtasks.length){
                copy[taskToUpdateIdx].subtasks = task.subtasks.map( subtask => {
                    return {
                        ...subtask,
                        completed: e.target.checked
                    }
                }, e, id)
            }
            

            return copy
            

        })


    }

    const handleSubtaskChange = (e, subtaskId) => {

        setData( prev => {
            const copy = [...prev];

            const taskToUpdateIdx = prev.map( task => task._id).indexOf(id);

            const subtaskToUpdateIdx = subtasks.map( subtask => subtask._id).indexOf(subtaskId);

            copy[taskToUpdateIdx].subtasks = subtasks.map( subtask => {
                if (subtask._id === subtaskId){
                    return {
                        ...subtask,
                        completed: e.target.checked
                    }
                }

                return subtask
            })

            return copy;


        }, e, id, subtaskId, subtasks)
    }

    const styleProps = {
        main: {
            w: "100%",
            mt: "4",
            border: "1px",
            borderColor: useColorModeValue("primary.600", "primary.200"),
            p: 5,
            borderRadius: "md",
            shadow: useColorModeValue("lg", "dark-lg"),
            position: "relative"
        },
        editBtn: {
            position: "absolute",
            top: 5,
            right: 5,
            size: "sm",
            icon: <EditIcon />,
            variant: "ghost",
            colorScheme: "primary"
        },
        checkbox: {
            colorScheme: "primary",
            spacing: 3
        }
    }

    return (
        
        <Box {...styleProps.main} >
            <IconButton {...styleProps.editBtn} />
            <Checkbox {...styleProps.checkbox} size="lg" isChecked={subtasks.length ? allChecked : completed } isIndeterminate={subtasks.length ? isIndeterminate : false} onChange={handleTaskChange}>{name}</Checkbox>
            
            <VStack align="start" ml="8" mt="2">
                {
                    subtasks && subtasks.map( subtask => {

                        return <Checkbox {...styleProps.checkbox} isChecked={subtask.completed} onChange={e => handleSubtaskChange(e, subtask._id)}>{subtask.name}</Checkbox>
                    })
                }
            </VStack>

        </Box>
    );
}

export default Task;
