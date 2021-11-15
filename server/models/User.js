import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    tasks: [
        {
            taskName: {
                type: String,
                required: [true, "Task name is required"]
            },
            taskId: {
                type: String,
                required: [true, 'taskId is required']
            },
            notes: String
        }

    ]
});

UserSchema.methods.updateTask = function(taskId, task){
    for (let i = 0; i < this.tasks.length; i++){
        if (this.tasks[i].taskId === taskId){
            this.tasks[i] = task;
        }
    }
}

const User = mongoose.model("User", UserSchema);



export default User;