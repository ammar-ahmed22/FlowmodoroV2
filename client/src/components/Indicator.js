import React, { useEffect } from "react";
import "../css/Indicator.css";

const Indicator = ({ isBreak, elapsed, workTime }) => {
    useEffect(()=>{
        if (isBreak){
            const movingBar = document.querySelector(".moving-bar")
            const percentage = ((workTime - elapsed) / workTime) * 100;
            
            if (percentage !== 0){
                movingBar.style.width = `${percentage}%`
            }else{
                movingBar.style.display = "none";
            }
            
        }
    }, [isBreak, elapsed, workTime])
  if (isBreak) {
    return (
        <div className="static-bar">
            <div className="moving-bar"></div>
        </div>
    );
  } else {
    return <div></div>;
  }
};

export default Indicator;
