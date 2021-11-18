class Stopwatch {
  constructor(setElapsed, setIID) {
    this.setElapsed = setElapsed;
    this.setIID = setIID;
  }

  start = () => {
    this.setIID(
      setInterval(() => {
        this.setElapsed((elapsed) => elapsed + 1);
      }, 1000)
    );
  };

  stop = (IID) => {
    console.log("in stop watch stop:", IID);
    if (!IID) {
      return;
    }

    clearInterval(IID);
  };

  reset = (IID) => {
    this.stop(IID);
    this.setElapsed(0);
  };
}

export default Stopwatch;
