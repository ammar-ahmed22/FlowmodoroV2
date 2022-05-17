import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    tasks: [
        {
            name: {
                type: String,
                required: [true, "Please provide task name."]
            },
            completed: {
                type: Boolean,
                required: [true, "Completed value for task must be provided."]
            },
            subtasks: [
                {
                    name: {
                        type: String,
                        required: [true, "Please provide a subtask name"]
                    },
                    completed: {
                        type: Boolean,
                        required: [true, "Completed value for subtask must be provided"]
                    }
                }
            ]
        }
    ],
    sessionData: [
        {
            workTime: {
                type: Number
            },
            breakRatio: {
                type: Number
            },
            datetimeCompleted: {
                type: Date
            }
        }
    ]
})

UserSchema.methods.addTask = async function(task){
    this.tasks.push(task);

    await this.save();
}

UserSchema.methods.addSubtasks = async function(taskId, subtasks){

    const taskIdx = this.tasks.filter( task => task._id ).indexOf(taskId);

    if (taskIdx === -1){
        return "Task not found"
    } 

    this.tasks[taskIdx].subtasks.push(...subtasks);

    await this.save();

    return false

}

UserSchema.methods.deleteTask = async function(taskId){
    this.tasks = this.tasks.filter( task => {
        return !task._id.equals(taskId);
    });

    await this.save();
}

UserSchema.methods.deleteSubtask = async function(taskId, subtaskId){
    const taskIdx = this.tasks.map( task => task._id).indexOf(taskId);

    if (taskIdx === -1){
        return "Task not found"
    }else{
        const task = this.tasks[taskIdx];

        const subIdx = task.subtasks.map( subtask => subtask._id).indexOf(subtaskId);

        if (subIdx === -1){
            return "Subtask not found"
        }else{
            this.tasks[taskIdx].subtasks = task.subtasks.filter( (_, idx) => idx !== subIdx);

            await this.save();

            return false
        }
    }
}

const User = mongoose.model("User", UserSchema);

export default User;