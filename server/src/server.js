import dotenv from "dotenv"
dotenv.config({ path: "./config.env" });
import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import readContent from "./utils/readContent";
import connectDB from "./utils/connectDB";


const PORT = process.env.PORT || 8080;

( async () => {

    const app = express();

    const server = new ApolloServer({
        typeDefs: readContent("./src/typeDefs/user.gql"),
        resolvers
    })

    await server.start();

    server.applyMiddleware({ app })

    connectDB("mongodb://127.0.0.1:27017/flowv2?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1")

    app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`))

})();