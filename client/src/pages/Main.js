import React from 'react';
import Clock from '../components/Clock';

const Main = () => {
    return (
        <div className="container">
            <Clock isBreak={false}/>
        </div>
    );
}

export default Main;
