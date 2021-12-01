import dotenv from "dotenv"
dotenv.config({path: "./config.env"});
let database = [];

import express from "express";
import cors from 'cors';
import { graphqlHTTP } from "express-graphql";

import connectDB from "./utils/connectDB";

import schema from "./schemas/schema";
import resolver from "./resolvers/resolver";


const app = express();
app.use(cors());

connectDB();

app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
}))

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => console.log(`API is live at http://localhost:${PORT}/graphql`));
