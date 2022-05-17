import React, { createContext, useState, useEffect } from "react"
import useUserID from "../hooks/useUserID";
import { useQuery, gql } from "@apollo/client";
//import { gql } from "graphql";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {

    // Cookies
    const [ userID, setUserID, removeUserID] = useUserID();

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
            setState( state => {

                const { setTo, updateSubtasks } = options;
                console.log("toggleTaskComplete:", options)

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
            setState( state => {
                
                const { setTo } = options;

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
        },
        editSubtaskName: () => {},
    })


    const GET_TASKS = gql`
        query getTasks($id: String!){
            getTasks(id: $id){
                _id
                name
                completed
                subtasks{
                    _id
                    name
                    completed
                }
            }
        }
    `

    useEffect(() => {
        console.log({ userID })
        state.setId(userID);
    }, [userID])

    const { data, loading, error } = useQuery(GET_TASKS, {
        variables: { id: state.id },
        skip: !state.id
    })

    

    useEffect(() => {
        console.log({ data, loading, error })
        if (data && data.getTasks && !state.dataExists){
            console.log("SETTING TASKS")
            state.setTasks(data.getTasks);
            state.setDataExists(true);
        }
    }, [data, loading, error ])

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