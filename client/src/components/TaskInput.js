import React, { useState } from "react";
import "../css/Task.css";
import "../css/TaskInput.css";

const TaskInput = () => {
  const [inputting, setInputting] = useState(false);
  const [areNotes, setAreNotes] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");

  if (inputting) {
    return (
      <div className="task d-block py-3">
        <input
          type="text"
          className="form-control my-1"
          id="taskName"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          placeholder="What are you working on?"
        ></input>
        {!areNotes ? (
          <button
            className="btn text-light text-decoration-underline text-start my-1"
            onClick={(e) => setAreNotes(true)}
          >
            + Add Notes
          </button>
        ) : (
          <textarea
            cols="3"
            rows="3"
            className="notes-input my-1"
            placeholder="Some notes..."
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          ></textarea>
        )}
        <div className="task-input-ctrls d-flex justify-content-end">
          <button
            className="btn text-light"
            onClick={(e) => setInputting(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary text-dark">Save</button>
        </div>
      </div>
    );
  } else {
    return (
      <button className="btn text-primary" onClick={(e) => setInputting(true)}>
        <i className="fas fa-plus"></i>
      </button>
    );
  }
};

export default TaskInput;
