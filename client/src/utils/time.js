export const secondsToHMS = (secs) =>{
    const h = Math.floor(secs / 3600);
    const m = Math.floor(secs % 3600 / 60);
    const s = Math.floor(secs % 3600 % 60);

    return {
        hours: h < 10 ? `0${h}` : h,
        minutes: m < 10 ? `0${m}` : m,
        seconds: s < 10 ? `0${s}` : s
    };
}

export const displayCalcBreak = (elapsed) =>{
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor(elapsed % 3600 / 60);
    const seconds = Math.floor(elapsed % 3600 % 60);
    
    if (seconds && !minutes && !hours){
        return `${seconds}s`
    }else if (seconds && minutes && !hours){
        return `${minutes}m ${seconds}s`
    }else if (seconds && minutes && hours){
        return `${hours}h ${minutes}m ${seconds}s`;
    }else{
        return '0s'
    }
}