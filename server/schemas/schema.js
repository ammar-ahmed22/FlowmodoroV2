import { buildSchema } from "graphql";

const schema = buildSchema(`
    input TaskInput {
        taskName: String!
        notes: String
    }

    type Task {
        taskId: ID!
        taskName: String!
        notes: String
    }

    type User {
        id: ID!
        tasks: [Task]
    }

    type Query {
        getUser(id: ID!): User
        getTasks(id: ID!): User
        Users: [User]
    }

    type Mutation {
        createUser(input: TaskInput): User
        createTask(id: ID!, input: TaskInput): User
        updateTask(id: ID!, taskId: ID!, input: TaskInput): User
        deleteTask(id: ID!, taskId: ID!): User
        deleteUser(id: ID!): [User]
    }
`)

export default schema;