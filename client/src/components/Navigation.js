import React, { useRef, useEffect } from "react";
import "../css/Navigation.css";

const Navigation = ({ isBreak, modeSwitcher }) => {
    const workBtn = useRef();
    const breakBtn = useRef();

    useEffect(()=>{
        if (isBreak){
            workBtn.current.classList.remove('active');
            breakBtn.current.classList.add("active");
        }else{
            workBtn.current.classList.add('active');
            breakBtn.current.classList.remove("active");
        }
    }, [isBreak])
  return (
    <div className="navigation d-flex align-items-center justify-content-center">
      <button
        className="btn text-primary p-0"
        onClick={modeSwitcher}
        ref={workBtn}
      >
        <i className="fas fa-briefcase"></i> Work
      </button>
      <button
        className="btn text-primary p-0"
        onClick={modeSwitcher}
        ref={breakBtn}
      >
        <i className="fas fa-bed"></i> Break
      </button>
    </div>
  );
};

export default Navigation;
