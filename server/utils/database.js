export const findByTaskId = (tasks, taskId, input) =>{
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i] === taskId){
            tasks[i] = input;
        }
    }
}