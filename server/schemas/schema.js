import { buildSchema } from "graphql";

const schema = buildSchema(`
    input TaskInput {
        taskName: String!
        notes: String
        completed: Boolean!
    }

    type Task {
        taskId: ID!
        taskName: String!
        notes: String
        completed: Boolean!
    }

    type User {
        id: ID!
        tasks: [Task]
    }

    type Query {
        getUser(id: ID!): User
        getTasks(id: ID!): [Task]
        Users: [User]
    }

    type Mutation {
        createUser(input: TaskInput): User
        createTask(id: ID!, input: TaskInput): [Task]
        updateTask(id: ID!, taskId: ID!, input: TaskInput): [Task]
        completeTask(id: ID!, taskId: ID!, completed: Boolean!): [Task]
        deleteTask(id: ID!, taskId: ID!): [Task]
        deleteUser(id: ID!): [User]
    }
`)

export default schema;