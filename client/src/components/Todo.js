import React from 'react';
import "../css/Todo.css";

import TodoList from './TodoList';

const Todo = () => {
    return (
        <section className="todo d-flex flex-column align-items-center" id="todo">
            <div className="todo-heading">
                <h3 className="text-primary text-start">Today's Tasks (2)</h3>
            </div>
            <TodoList />
        </section>
    );
}

export default Todo;
