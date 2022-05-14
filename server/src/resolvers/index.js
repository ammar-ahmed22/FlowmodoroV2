import User from "../models/User";
import { UserInputError } from "apollo-server-express"

const resolvers = {
    Query: {
        hello: () => "hello world",
        getTasks: async (_, { id }) => {
            const user = await User.findById(id);

            if (user){
                return user.tasks;
            }

            throw new UserInputError("User not found", { id })
        }
    },
    Mutation: {
        createUserWithTask: async (_, { name, completed, notes }) => {
            const newUser = await User.create({
                tasks: [
                    {
                        name,
                        completed,
                        notes
                    }
                ],
                sessionData: []
            })

            if (newUser){
                return newUser
            };
        },
        createUserWithSession: async (_, { workTime, breakRatio, datetimeCompleted }) => {
            const newUser = await User.create({
                sessionData: [
                    {
                        workTime,
                        breakRatio,
                        datetimeCompleted: new Date(datetimeCompleted)
                    }
                ],
                tasks: []
            })

            if (newUser){
                return newUser
            }
        },
        addSessionData: async (_, { id, workTime, breakRatio, datetimeCompleted }) => {
            const user = await User.findById(id);

            if (user){
                
                user.sessionData.push({
                    workTime,
                    breakRatio,
                    datetimeCompleted
                })
                
                await user.save();

                return user
            }

            throw new UserInputError("User not found", { id });
        },
        addTask: async (_, { id, name, completed, notes }) => {

            const user = await User.findById(id);

            if (user){
                
                user.tasks.push({
                    name,
                    completed,
                    notes
                })
                
                await user.save();

                return user;
            }

            throw new UserInputError("User not found", { id });
        },
        deleteTask: async (_, { id, taskId }) => {
            const user = await User.findById(id);

            if (user){

                user.deleteTask(taskId)

                await user.save();

                return user;
            }

            throw new UserInputError("User not found", { id });
        }
    }
}


export default resolvers