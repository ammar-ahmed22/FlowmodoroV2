import React from 'react';
import data from '../test/testData';
import Task from './Task';
import TaskInput from './TaskInput';

const TodoList = () => {
    return (
        <div className="todo-list d-flex flex-column align-items-center">
            {
                data.map((task, index) => {
                    return <Task name={task.taskName} notes={task.notes} completed={task.completed} id={index} />
                })
            }
            <TaskInput />
        </div>
    );
}

export default TodoList;
