import React, { useState, useRef } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const start = () => {
    if (timeLeft <= 0) return;

    setIsRunning(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setTimeLeft(initialTime);
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const handleUserInput = (setter) => (e) => {
    if (isRunning) return;
    const value = Math.max(0, Number(e.target.value) || 0);
    setter(value);
  };

  const setHours = (h) => {
    const newTime = h * 3600 + minutes * 60 + seconds;
    setTimeLeft(newTime);
    setInitialTime(newTime);
  };
  const setMinutes = (m) => {
    const newTime = hours * 3600 + m * 60 + seconds;
    setTimeLeft(newTime);
    setInitialTime(newTime);
  };
  const setSeconds = (s) => {
    const newTime = hours * 3600 + minutes * 60 + s;
    setTimeLeft(newTime);
    setInitialTime(newTime);
  };

  return (
    <div>
      <div>
        <input
          value={hours}
          disabled={isRunning}
          onChange={handleUserInput(setHours)}
        />
        <input
          value={minutes}
          disabled={isRunning}
          onChange={handleUserInput(setMinutes)}
        />
        <input
          value={seconds}
          disabled={isRunning}
          onChange={handleUserInput(setSeconds)}
        />
      </div>
      <div>
        <button onClick={start} disabled={isRunning || timeLeft <= 0}>
          Start
        </button>
        <button onClick={pause} disabled={!isRunning}>
          Pause
        </button>
        <button
          onClick={reset}
          disabled={timeLeft === initialTime && !isRunning}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDown;