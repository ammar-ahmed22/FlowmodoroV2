import { gql } from "@apollo/client";

const TOGGLE_TASK = gql`
        mutation toggleTask(
            $id: String!,
            $taskId: String!,
            $setTo: Boolean
        ){
            toggleTask(
                id: $id,
                taskId: $taskId,
                setTo: $setTo
            ){
                _id
                tasks{
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
        }
`

export default TOGGLE_TASK;