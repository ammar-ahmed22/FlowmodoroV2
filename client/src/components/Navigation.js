import React from "react";
import "../css/Navigation.css";

const Navigation = ({ isBreak, modeSwitcher }) => {
  return (
    <div className="navigation d-flex align-items-center justify-content-center">
      <button
        className={
          isBreak ? "btn text-primary p-0" : "btn text-primary p-0 active"
        }
        onClick={modeSwitcher}
      >
        <i className="fas fa-briefcase"></i> Work
      </button>
      <button
        className={
          !isBreak ? "btn text-primary p-0" : "btn text-primary p-0 active"
        }
        onClick={modeSwitcher}
      >
        <i className="fas fa-bed"></i> Break
      </button>
    </div>
  );
};

export default Navigation;
