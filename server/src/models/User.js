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
            notes: {
                type: String,
                required: false
            }
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

UserSchema.methods.deleteTask = function(taskId){
    this.tasks = this.tasks.filter( task => {
        return !task._id.equals(taskId);
    });
}

const User = mongoose.model("User", UserSchema);

export default User;