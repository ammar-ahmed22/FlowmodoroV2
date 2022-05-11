export const secondsToHMS = secs => {
    const [h, m, s] = new Date(secs * 1000).toISOString().substr(11, 8).split(":")
    return { 
        h, m, s
    }
}