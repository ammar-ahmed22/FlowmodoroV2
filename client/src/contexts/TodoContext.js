import React, { createContext, useState, useEffect } from "react"
import useUserID from "../hooks/useUserID";
import { useQuery, gql, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
const toggleTaskMutation = loader("../graphql/mutations/toggleTask.graphql");
const toggleSubtaskMutation = loader("../graphql/mutations/toggleSubtask.graphql");
const addTaskMutation = loader("../graphql/mutations/addTask.graphql");
const getTasksQuery = loader("../graphql/queries/getTasks.graphql");
const deleteTaskMutation = loader("../graphql/mutations/deleteTask.graphql");


const TodoContext = createContext();

const TodoProvider = ({ children }) => {

    // Cookies
    const [ userID, setUserID, removeUserID] = useUserID();

    const [ toggleTask, toggleTaskResponse ] = useMutation(toggleTaskMutation, { errorPolicy: "all"});
    const [ toggleSubtask, toggleSubtaskResponse ] = useMutation(toggleSubtaskMutation, { errorPolicy: "all" });

    const [ addTask ] = useMutation(addTaskMutation, { 
        errorPolicy: "all", 
        onCompleted: data => {
            console.log("onCompleted:", data);
            state.setTasks(data.addTask.tasks);
        } 
    });

    const [ deleteTask ] = useMutation(deleteTaskMutation, { 
        errorPolicy: "all", 
        onCompleted: (data) => {
            console.log("onCompleted:", data)
            state.setTasks(data.deleteTask.tasks);
        } 
    });

    

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
        addTask: (task) => {
            task.subtasks = task.subtasks.map( subtask => {
                const updated = {...subtask};

                delete updated._id;

                return updated;
            })
            if (userID){
                const { name, completed, subtasks } = task;
                addTask({ variables: {
                    id: userID,
                    name,
                    completed,
                    subtasks
                }})
            }
        },
        deleteTask: (taskId) => {
            console.log("delete being called");
            if (userID){
                deleteTask({
                    variables: {
                        id: userID,
                        taskId
                    }
                })
            }
        }
    })


    const getTaskResponse = useQuery(getTasksQuery, {
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
        
        const { data, loading, error } = getTaskResponse;

        if (data && data.getTasks && !state.dataExists){
            console.log("SETTING TASKS")
            state.setTasks(data.getTasks);
            state.setDataExists(true);
        }
    }, [getTaskResponse])

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