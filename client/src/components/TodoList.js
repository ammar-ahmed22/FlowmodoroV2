import React, { useEffect, useState } from 'react';
import Task from './Task';
import TaskInput from './TaskInput';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../queries/query';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [userID, setUserID] = useState("");
    
    
    const { data, loading, error } = useQuery(GET_TASKS, {variables: {id: userID}})

    useEffect(()=>{
        const id = localStorage.getItem("flowUSERID");

        if (id){
            setUserID(id);
            if (!loading){
                if (error){
                    console.log("error")
                    console.log(error)
                    //onsole.log(data.getTasks)
                }
                if (data){
                    setTasks(data.getTasks);
                }
                
            }
        }
        
    }, [data, loading])
    return (
        <div className="todo-list d-flex flex-column align-items-center">
            {
                tasks.map((task, index) => {
                    return <Task name={task.taskName} notes={task.notes} completed={task.completed} id={task.taskId} key={task.taskId} />
                })
            }
            <TaskInput userID={userID} setUserID={setUserID} setTasks={setTasks} />
        </div>
    );
}

export default TodoList;
