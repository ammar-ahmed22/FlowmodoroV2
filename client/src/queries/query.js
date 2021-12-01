import { gql } from "graphql-tag"

export const USERS = gql`
query{
    Users{
        id
        tasks{
            taskName
            taskId
            notes
            completed
        }
    }
}
`

export const GET_TASKS = gql`
    query getTasks($id: ID!){
        getTasks(id: $id){
            taskName
            taskId
            notes
            completed
        }
    }
`

