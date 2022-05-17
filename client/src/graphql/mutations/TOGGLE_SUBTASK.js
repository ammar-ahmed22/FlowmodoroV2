import { gql } from "@apollo/client";

const TOGGLE_SUBTASK = gql`
        mutation toggleSubtask(
            $id: String!
            $taskId: String!,
            $subtaskId: String!,
            $setTo: Boolean
        ){
            toggleSubtask(
                id: $id,
                taskId: $taskId,
                subtaskId: $subtaskId,
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

export default TOGGLE_SUBTASK;