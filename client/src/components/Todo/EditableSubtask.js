import React, { useState, useEffect } from 'react';
import { Tag, HStack, TagCloseButton, Input, Checkbox, Box, Link, IconButton, Button } from "@chakra-ui/react"
import { EditIcon, SmallCloseIcon } from '@chakra-ui/icons';


const EditableSubtask = ({ subtask, setSubtasks }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState("");

    useEffect(() => {
        if (isEditing){
            setEdited(subtask.name)
        }
    }, [isEditing]) 

    const handleEdit = e => {
        setIsEditing(prev => prev ? false : true);
        setEdited(subtask.name);
    }

    const handleSave = e => {
        setIsEditing(prev => prev ? false : true);
        setSubtasks( prev => {
            const idx = prev.map( subtask => subtask._id ).indexOf(subtask._id);
            
            prev[idx].name = edited;

            return prev;
        })
    }

    const handleRemove = e => {
        setSubtasks( prev => {
            
            return prev.filter( prevsub => prevsub._id !== subtask._id )
        })
    }

    return (
        <HStack justify="space-between" w="100%" pl="5" >
            <HStack>
                <Checkbox >
                    {
                    isEditing ? "" : subtask.name
                    }
                </Checkbox>
                {
                    isEditing && <Input placeholder="Edit sub" type="text" variant="flushed" value={edited} onChange={e => setEdited(e.target.value)} />
                }
            </HStack>
            <HStack>
                <Button colorScheme="primary" size="xs" variant="outline" onClick={isEditing ? handleSave : handleEdit } >{ isEditing ? "Save" : "Edit"}</Button>
                <Button colorScheme="primary" size="xs" variant="outline" onClick={handleRemove}>Remove</Button>
            </HStack>
        </HStack>
    );
}

export default EditableSubtask;
