import React, { useRef, useEffect } from 'react';
import "../css/Task.css";

const Task = ({name, notes, completed, id}) => {

    const button = useRef();
    useEffect(()=>{
        if (completed){
            button.current.classList.add("completed");
        }else{
            button.current.classList.remove("completed");
        }
    }, [completed])

    return (
        <div className="task d-flex py-3" key={id}>
            <div className="task-toggle">
                <button className="btn task-btn m-0 py-0" ref={button} >{completed ? <i className="fas fa-check-circle"></i> : <i className="far fa-check-circle"></i>}</button>
            </div>
            <div className="task-content">
                {completed ? <h5 className="text-light text-decoration-line-through text-start">{name}</h5> : <h5 className="text-light text-start">{name}</h5>}
                {notes && (completed ? <p className="text-light task-notes text-decoration-line-through">{notes}</p> : <p className="text-light task-notes">{notes}</p>)}
            </div>
        </div>
    );
}

export default Task;
