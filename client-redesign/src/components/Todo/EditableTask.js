import React, { useState, useRef, useEffect, useId } from 'react';
import { Box, Text, useColorModeValue, Button, Flex, Input, HStack, FormControl, FormLabel, VStack, Checkbox, Tag, TagLeftIcon, TagLabel, TagCloseButton, IconButton, Link, Editable } from "@chakra-ui/react"
import { PlusSquareIcon, SmallAddIcon, MinusIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import EditableSubtask from './EditableSubtask';


const EditableTask = ({ setData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSub, setIsEditingSub] = useState(false);
    const [editingSub, setEditingSub] = useState("");
    const [addingSub, setAddingSub] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [subtasks, setSubtasks] = useState([]);
    const [subTaskName, setSubTaskName] = useState("");

    const styleProps = {
        main: {
            w: "100%",
            my: "4",
            border: "1px",
            borderColor: useColorModeValue("primary.600", "primary.200"),
            p: 5,
            borderRadius: "md",
            shadow: useColorModeValue("lg", "dark-lg"),
            position: "relative"
        },
        addTask: {
            fontSize: "xl",
            color: "primary.800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }

    const taskNameInput = useRef();

    useEffect(() => {
        if (isEditing){
            document.getElementById("task-name-input").focus();
        }
    }, [isEditing])

    const handleNewTask = e => {
        setIsEditing(true);
    }
    const createId = () => {
        return (Math.random() + 1).toString(36).substring(2);
    }
    const handleAddSubtask = e => {
        //const id = useId();
        setSubtasks( prev => [...prev, { name: subTaskName, completed: false, _id: createId() }]);
        setSubTaskName("");
    }

    const handleCancel = e => {
        setIsEditing(false);
        setAddingSub(false);
        setTaskName("");
        setSubTaskName("");
        setSubtasks([]);
    }

    const handleSubtaskCancel = e => {
        setAddingSub(false);
        setSubTaskName("")
    }

    const handleSave = e => {
        const task = {
            _id: createId(),
            name: taskName,
            completed: false,
            subtasks
        }

        setData( prev => ([...prev, task]))

        //setIsEditing(false);
        setAddingSub(false);
        setTaskName("");
        setSubTaskName("");
        setSubtasks([]);
    }

    const handleRemoveSubtask = (e, subtaskId) => {
        setSubtasks( prev => prev.filter( subtask => subtask._id !== subtaskId ));
    }

    const handleEditSubtask = (e, subtaskId) => {
        const [subtask] = subtasks.filter( subtask => subtask._id === subtaskId);


        setIsEditingSub(prev => prev ? false : true);
        setEditingSub(subtask.name);

    }

    const handleSaveEditSubtask = (e, subtaskId) => {
        setIsEditingSub(prev => prev ? false : true);
        setSubtasks( prev => {
            const subIdx = prev.map( subtask => subtask._id).indexOf(subtaskId);

            prev[subIdx] = { completed: false, name: editingSub, _id: createId() };

            return prev;

        })
    }

    const id = useId();

    if (isEditing){
        return (
            <Box {...styleProps.main}>
                <Input variant="unstyled" placeholder="What are you working on?" fontSize="xl" fontWeight="bold"  id="task-name-input" _placeholder={{color: "gray.500"}} value={taskName} onChange={e => setTaskName(e.target.value)}></Input>
                        <FormControl mt="2" >
                            {!!(addingSub || subtasks.length)  && <FormLabel  fontSize="md" color="primary.200" fontWeight="bold" >Subtasks</FormLabel>}
                            {!!subtasks.length && (
                                <VStack align="start" mb="3" >
                                    {
                                        subtasks.map( subtask => {
                                            return (
                                            <EditableSubtask subtask={subtask} setSubtasks={setSubtasks} />
                                            )
                                        })
                                    }
                        
                                </VStack>
                            )
                            }

                            {
                                addingSub && (
                                    <>
                                    <Input variant="outline" placeholder="What else do you have to do" fontSize="md" _placeholder={{ color: "gray.500"}} value={subTaskName} onChange={e => setSubTaskName(e.target.value)}/>
                                    <HStack justify="start" mt="2">
                                        <Button colorScheme="primary" size="xs" onClick={handleAddSubtask} disabled={!subTaskName}>Add</Button>
                                        <Button colorScheme="primary" variant="ghost" size="xs" onClick={handleSubtaskCancel}>Cancel</Button>
                                    </HStack>
                                    </>
                                )
                            }
                            
                        </FormControl>
                        
                    
                
                {!addingSub && <Button colorScheme="primary" variant="ghost" size="sm" leftIcon={<SmallAddIcon />} mt="2" onClick={e => setAddingSub(true)}>Add Subtasks</Button>}
                <HStack justify="end" mt="2">
                    
                    <Button colorScheme="primary" size="sm" variant="ghost" onClick={handleCancel}>Cancel</Button>
                    <Button colorScheme="primary" size="sm" disabled={!taskName} onClick={handleSave} >Save</Button>
                </HStack>
            </Box>
            
        );
    }else{
        return (
            <Flex justify="center" my="4">
                <Button leftIcon={<SmallAddIcon />} colorScheme="primary" variant="ghost" onClick={handleNewTask}>Add Task</Button>
            </Flex>
        )
    }
    
}

export default EditableTask;
