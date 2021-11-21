import * as crypto from "crypto";
import User from "../models/User";

const resolver = {
    //Creation resolvers
    createUser: async ({ input }) =>{
        const taskId = crypto.randomBytes(12).toString("hex");
        input.taskId = taskId;

        const user = await User.create({
            tasks: [input]
        })

        
        return user;
    },
    createTask: async ({id, input}) =>{
        const taskId = crypto.randomBytes(12).toString("hex");
        input.taskId = taskId;

        const user = await User.findById(id);
        if (!user){
            throw new Error("User not found")
        }else{
            user.tasks.push(input);

            await user.save();

            return user.tasks;
        }
        



        
    },
    //Reading resolvers
    Users: async () =>{
        const users = await User.find({});

        return users;
    },
    getUser: async ({ id }) => {
        
        const user = await User.findById(id);
        

        if (!user){
            throw new Error('User not found');
        }else{
            return user;
        }
        
        
        
    },
    getTasks: async ({ id }) =>{
        const user = await User.findById(id);

        if (!user){
            throw new Error("User not found")
        }else{
            return user.tasks;
        }
    },
    // Updating resolvers
    updateTask: async ({id, taskId, input}) => {
        
        input.taskId = taskId;
        const user = await User.findById(id);

        if (!user){
            throw new Error("User not found")
        }else{
            
            user.updateTask(taskId, input);

            await user.save();

            return user;
        }
        

        

    },
    completeTask: async ({id, taskId, completed}) => {
        const user = await User.findById(id);
        if (user){
            const task = user.findTaskById(taskId);
            
            if (task){
                task.completed = completed;

                await user.save();

                return user.tasks;
            }else{
                throw new Error("Task not found")
            }
            
        }else{
            throw new Error("User not found")
        }
        



    },
    //Deleting resolvers
    deleteTask: async ({id, taskId}) =>{
        const user = await User.findById(id);

        if (!user){
            throw new Error("User not found")
        }else{
            user.removeTaskById(taskId);
            await user.save();
            
            return user.tasks;
        }
    },
    deleteUser: async (id) =>{
        await User.findOneAndDelete({id});

        const users = await User.find({});
        return users;
    }
    
}


export default resolver