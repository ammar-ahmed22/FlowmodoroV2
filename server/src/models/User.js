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

const getIdxFromID = (mongoArray, id) => {
    return mongoArray.map( item => item._id.toString()).indexOf(id);
}

UserSchema.methods.addTask = async function(task){
    this.tasks.push(task);

    await this.save();
}

UserSchema.methods.addSubtasks = async function(taskId, subtasks){

    const taskIdx = getIdxFromID(this.tasks, taskId);

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
    const taskIdx = getIdxFromID(this.tasks, taskId);

    if (taskIdx === -1){
        return "Task not found"
    }else{
        const task = this.tasks[taskIdx];

        const subIdx = getIdxFromID(task.subtasks, subtaskId);

        if (subIdx === -1){
            return "Subtask not found"
        }else{
            this.tasks[taskIdx].subtasks = task.subtasks.filter( (_, idx) => idx !== subIdx);

            await this.save();

            return false
        }
    }
}

UserSchema.methods.toggleTask = async function(taskId, setTo){
    const idmap = this.tasks.map(task => task._id.toString());
    
    
    const taskIdx = getIdxFromID(this.tasks, taskId);

    if (taskIdx === -1){
        return "Task not found"
    }else{
        //console.log(this.tasks, taskIdx);
        const task = this.tasks[taskIdx];
        //console.log(task);
        const subtasks = task.subtasks;

        this.tasks[taskIdx].completed = setTo !== null ? setTo : task.completed ? false : true;

        
        this.tasks[taskIdx].subtasks = subtasks.map( subtask => {
            return {
                ...subtask,
                completed: setTo !== null ? setTo : task.completed ? false : true
            }
        })
        

        await this.save();

        return false
    }
}

UserSchema.methods.toggleSubtask = async function(taskId, subtaskId, setTo){
    const taskIdx = getIdxFromID(this.tasks, taskId);

    if (taskIdx === -1){
        return "Task not found"
    }else{
        const task = this.tasks[taskIdx];

        const subtaskIdx = getIdxFromID(task.subtasks, subtaskId);

        if (subtaskIdx === -1){
            return "Subtask not found"
        }else{
            this.tasks[taskIdx].subtasks[subtaskIdx].completed = setTo !== null ? setTo : task.subtasks[subtaskIdx].completed ? false : true;

            const allComplete = this.tasks[taskIdx].subtasks.every( subtask => subtask.completed );

            if (allComplete){
                this.tasks[taskIdx].completed = true;
            }

            await this.save();

            return false
        }
    }
}

const User = mongoose.model("User", UserSchema);

export default User;