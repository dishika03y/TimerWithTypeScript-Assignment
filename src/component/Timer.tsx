import React, { useEffect, useRef } from "react";

const Timer: React.FC = () => {
  const timeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const displayRef = useRef<HTMLDivElement | null>(null);

  const updateUI = (time: number) => {
    if (displayRef.current) {
      const hour = Math.floor(time / 3600)
        .toString()
        .padStart(2, "0");
      const min = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const sec = (time % 60).toString().padStart(2, "0");

      displayRef.current.innerText = `${hour}:${min}:${sec}`;
    }
  };

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        timeRef.current += 1;
        updateUI(timeRef.current);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    timeRef.current = 0;
    updateUI(0);
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);
  return (
    <div className="d-flex flex-column gap-3 align-items-center justify-content-center vh-100 bg-dark text-white">
      <div ref={displayRef} className="fs-1 mb-3">
        00:00:00
      </div>
      <button onClick={startTimer} className="btn btn-success px-4 py-2">
        Start
      </button>
      <button onClick={resetTimer} className="btn btn-warning px-4 py-2">
        Reset
      </button>
      <button onClick={stopTimer} className="btn btn-danger px-4 py-2">
        Stop
      </button>
    </div>
  );
};

export default Timer;
