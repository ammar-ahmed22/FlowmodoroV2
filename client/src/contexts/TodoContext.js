import React, { createContext, useState, useEffect } from "react"
import useUserID from "../hooks/useUserID";
import { useQuery, gql, useMutation } from "@apollo/client";
import TOGGLE_TASK from "../graphql/mutations/TOGGLE_TASK";
import TOGGLE_SUBTASK from "../graphql/mutations/TOGGLE_SUBTASK";
import GET_TASKS from "../graphql/queries/GET_TASKS";
//import { gql } from "graphql";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {

    // Cookies
    const [ userID, setUserID, removeUserID] = useUserID();

    const [ toggleTask, toggleTaskResponse ] = useMutation(TOGGLE_TASK, { errorPolicy: "all"});
    const [ toggleSubtask, toggleSubtaskResponse ] = useMutation(TOGGLE_SUBTASK, { errorPolicy: "all" });

    

    const getIdxById = (array, id) => {
        return array.map( item => item._id ).indexOf(id);
    }

    const [state, setState] = useState({
        id: null,
        setId: id => setState( state => ({...state, id })),
        dataExists: false,
        setDataExists: val => setState( state => ({...state, dataExists: val})),
        tasks: [],
        setTasks: tasks => setState( state => ({...state, tasks })),
        toggleTaskComplete: (id, options={ setTo: null, updateSubtasks: false }) => {
            const { setTo, updateSubtasks } = options;
            setState( state => {

                
                //console.log("toggleTaskComplete:", options)

                const taskIdx = getIdxById(state.tasks, id)

                const updated = [...state.tasks];
                
                const task = {...updated[taskIdx]};

                task.completed = setTo !== null ? setTo : state.tasks[taskIdx].completed ? false : true;

                if (task.subtasks.length && updateSubtasks){

                    task.subtasks = task.subtasks.map( subtask => {
                        return {
                            ...subtask,
                            completed: setTo !== null ? setTo : state.tasks[taskIdx].completed ? false : true
                        }
                    })

                }

                updated[taskIdx] = task;

                

                return {
                    ...state,
                    tasks: updated
                }
            })

            
            if (setTo !== null && userID && id){
                
                toggleTask({ variables: {
                    id: userID,
                    taskId: id,
                    setTo: setTo
                }})
            }
            

            
        },
        editTaskName: (id, name) => {
            setState( state => {
                const taskIdx = getIdxById(state.tasks, id);

                let updated = [...state.tasks];

                updated[taskIdx].name = name;

                return {
                    ...state,
                    tasks: updated
                }
            })
        },
        toggleSubtaskComplete: (taskId, subtaskId, options={ setTo: null }) => {
            const { setTo } = options;
            setState( state => {
                
                //const { setTo } = options;

                const taskIdx = getIdxById(state.tasks, taskId);
                const subtaskIdx = getIdxById(state.tasks[taskIdx].subtasks, subtaskId);

                const updated = [...state.tasks];

                const task = {...updated[taskIdx]};

                task.subtasks = task.subtasks.map( (subtask, idx) => {
                    if (idx === subtaskIdx){
                        return {
                            ...subtask,
                            completed: setTo !== null ? setTo : subtask.completed ? false : true
                        }
                    }else{
                        return subtask
                    }
                })

                updated[taskIdx] = task;

                return {
                    ...state,
                    tasks: updated
                }

            })

            if (userID){
                toggleSubtask({ variables: {
                    id: userID,
                    taskId,
                    subtaskId,
                    setTo
                }})
            }
            
        },
        editSubtaskName: () => {},
    })


    const getTaskResponse = useQuery(GET_TASKS, {
        variables: { id: state.id },
        skip: !state.id
    })

    



    useEffect(() => {
        console.log({ userID })
        state.setId(userID);
    }, [userID])

    useEffect(() => {
        const { data, loading, error } = toggleTaskResponse;

        if (error){
            console.log(error)
        }

    }, [toggleTaskResponse])

    useEffect(() => {
        const { data, loading, error } = toggleSubtaskResponse;

        if (error){
            console.log(error)
        }
    }, [toggleSubtaskResponse])

    

    

    useEffect(() => {
        //console.log({ data, loading, error })
        const { data, loading, error } = getTaskResponse;

        if (data && data.getTasks && !state.dataExists){
            console.log("SETTING TASKS")
            state.setTasks(data.getTasks);
            state.setDataExists(true);
        }
    }, [getTaskResponse ])

    return (
        <TodoContext.Provider value={state} >
            {
                children
            }
        </TodoContext.Provider>
    )
}

export { TodoContext };
export default TodoProvider;