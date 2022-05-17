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
        createUserWithTask: async (_, { name, completed, subtasks }) => {
            const newUser = await User.create({
                tasks: [
                    {
                        name,
                        completed,
                        subtasks
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
        addTask: async (_, { id, name, completed, subtasks }) => {

            const user = await User.findById(id);

            if (user){
                
                await user.addTask({
                    name,
                    completed,
                    subtasks
                })
                
                //await user.save();

                return user;
            }

            throw new UserInputError("User not found", { id });
        },
        deleteTask: async (_, { id, taskId }) => {
            const user = await User.findById(id);

            if (user){

                await user.deleteTask(taskId)

                //await user.save();

                return user;
            }

            throw new UserInputError("User not found", { id });
        },
        addSubtasks: async (_, { id, taskId, subtasks }) => {
            // add a subtask
            const user = await User.findById(id);

            if (user){
                const error = await user.addSubtask(taskId, subtasks);

                if (error){
                    throw new UserInputError(error, { id, taskId })
                }

                return user;
            }

            throw new UserInputError("User not found", { id, taskId })
        },
        deleteSubtask: async (_, { id, taskId, subtaskId }) => {
            // delete a subtask

            const user = await User.findById(id);

            if (user){
                const error = await user.deleteSubtask(taskId, subtaskId);

                if (error){
                    throw new UserInputError(error, { id, taskId, subtaskId });
                }

                return user;
            }

            throw new UserInputError("User not found", { id, taskId, subtaskId });
        },
        editTaskName: () => {

        },
        editSubtaskName: () => {},
        completeTask: () => {},
        completeSubtask: () => {},
    }
}


export default resolvers