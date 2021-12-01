import ApolloClient from "apollo-boost";

//put this in environment variables
const URI = 'http://localhost:2000/graphql';

export const client = new ApolloClient({
    uri: URI
})