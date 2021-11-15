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

            return user;
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
    // Updating resolvers
    updateTask: async ({id, taskId, input}) => {
        
        input.taskId = taskId;
        const user = await User.findById(id);

        if (!user){
            throw new Error("User not found")
        }else{
            // for (let i = 0; i < user.tasks.length; i++){
            //     if (user.tasks[i].taskId === taskId){
            //         user.tasks[i] = input;
            //     }
            // }

            user.updateTask(taskId, input);

            await user.save();

            return user;
        }
        

        

    },
    //Deleting resolvers
    deleteTask: async ({id, taskId}) =>{
        const user = await user.findById(id);

        if (!user){
            throw new Error("User not found")
        }else{

        }
    },
    deleteUser: async (id) =>{
        await User.findOneAndDelete({id});

        const users = await User.find({});
        return users;
    }
    
}


export default resolver