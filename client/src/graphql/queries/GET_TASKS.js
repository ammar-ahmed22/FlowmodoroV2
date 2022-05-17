import { gql } from "@apollo/client";

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

export default GET_TASKS