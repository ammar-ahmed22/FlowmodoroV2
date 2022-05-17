import React, { useEffect, useContext } from 'react';
import { Box, Checkbox, VStack, useColorModeValue, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { TodoContext } from '../../contexts/TodoContext';

const Task = ({ id, task }) => {

    const { name, completed, subtasks } = task; 

    const { toggleTaskComplete, toggleSubtaskComplete } = useContext(TodoContext);

    const allChecked = subtasks.map( subtask => subtask.completed).every(Boolean);
    const isIndeterminate = subtasks.map( subtask => subtask.completed).some(Boolean) && !allChecked;

    // Setting task to complete if all subtasks are checked
    useEffect(() => {
        toggleTaskComplete(id, { setTo: allChecked, updateSubtasks: false })
    }, [allChecked])

    

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
            <Checkbox {...styleProps.checkbox} size="lg" isChecked={subtasks.length ? allChecked : completed } isIndeterminate={subtasks.length ? isIndeterminate : false} onChange={e => toggleTaskComplete(id, { setTo: e.target.checked, updateSubtasks: true })}>{name}</Checkbox>
            
            <VStack align="start" ml="8" mt="2">
                {
                    subtasks && subtasks.map( subtask => {

                        return <Checkbox {...styleProps.checkbox} key={subtask._id} isChecked={subtask.completed} onChange={e => toggleSubtaskComplete(id, subtask._id, { setTo: e.target.checked })}>{subtask.name}</Checkbox>
                    })
                }
            </VStack>

        </Box>
    );
}

export default Task;
