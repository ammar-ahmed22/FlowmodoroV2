export const secondsToHMS = secs => {
    const [h, m, s] = new Date(secs * 1000).toISOString().substr(11, 8).split(":")
    return { 
        h, m, s
    }
}

export const secondsToTimeString = secs => {
    const { h, m, s } = secondsToHMS(secs);

    let values = [
        {
            value: parseInt(h),
            type: 'h'
        },
        {
            value: parseInt(m),
            type: "m"
        },
        {
            value: parseInt(s),
            type: "s"
        }
    ];

    let nonZeroValues = values.filter( item => item.value );

    let result = nonZeroValues.map( item => {
        return `${item.value}${item.type}`
    }).join(" ");
    
    if (nonZeroValues.length === 0){
        return '0s'
    }

    return result
}