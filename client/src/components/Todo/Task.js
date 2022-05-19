import React, { useEffect, useContext } from 'react';
import { Box, Checkbox, VStack, useColorModeValue, IconButton, HStack, Link } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { TodoContext } from '../../contexts/TodoContext';

const Task = ({ id, task }) => {

    const { name, completed, subtasks } = task; 

    const { toggleTaskComplete, toggleSubtaskComplete, deleteTask } = useContext(TodoContext);

    const allChecked = subtasks.map( subtask => subtask.completed).every(Boolean);
    const isIndeterminate = subtasks.map( subtask => subtask.completed).some(Boolean) && !allChecked;

    // Setting task to complete if all subtasks are checked
    useEffect(() => {
        if (subtasks.length > 0){
            toggleTaskComplete(id, { setTo: allChecked, updateSubtasks: false })
        }
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
            size: "sm",
            icon: <EditIcon />,
            color: useColorModeValue("primary.500", "primary.200"),
            _hover: {
                color: useColorModeValue("primary.600", "primary.300")
            }
        },
        deleteBtn: {
            size: "sm",
            icon: <DeleteIcon />,
            //variant: "ghost",
            color: useColorModeValue("primary.500", "primary.200"),
            _hover: {
                color: useColorModeValue("primary.600", "primary.300")
            }
        },
        checkbox: {
            colorScheme: "primary",
            spacing: 3
        },
        buttonStack: {
            position: "absolute",
            top: 5,
            right: 5
        }
    }

    return (
        
        <Box {...styleProps.main} >
            <HStack {...styleProps.buttonStack}>
                <Link {...styleProps.editBtn}>{styleProps.editBtn.icon}</Link>
                <Link {...styleProps.deleteBtn} onClick={e => deleteTask(task._id)} >{styleProps.deleteBtn.icon}</Link>
                {/* <IconButton icon={<EditIcon />} colorScheme="primary"  /> */}
            </HStack>
            
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
