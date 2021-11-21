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
            completed: {
                type: Boolean,
                required: [true, "completed Boolean is required"]
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

UserSchema.methods.findTaskById = function(taskId){
    for (let i = 0; i < this.tasks.length; i++){
        if (this.tasks[i].taskId === taskId){
            return this.tasks[i];
        }
    }
}

UserSchema.methods.removeTaskById = function(taskId){
    for (let i = 0; i < this.tasks.length; i++){
        if (this.tasks[i].taskId === taskId){
            this.tasks.splice(i, 1);
        }
    }
}

const User = mongoose.model("User", UserSchema);



export default User;