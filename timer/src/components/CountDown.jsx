import React, { useState, useRef } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const pad = (num) => String(num).padStart(2, "0");

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

  const handleUserInput = (setter, max) => (e) => {
        if (isRunning) return;
        let value = Math.max(0, Number(e.target.value) || 0);
        value = Math.min(value, max); // enforce max
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
    <div className="grid grid-rows-2 gap-5 justify-center my-10 rounded-lg mx-20 p-10">
      <div className="flex justify-between gap-2 text-center text-3xl">
        <input
          value={pad(hours)}
          disabled={isRunning}
          onChange={handleUserInput(setHours, 99)}
          className="timeInput"
        />
        <p className="timeInput">:</p>
        <input
          value={pad(minutes)}
          disabled={isRunning}
          onChange={handleUserInput(setMinutes, 99)}
          className="timeInput"
        />
        <p className="timeInput">:</p>
        <input
          value={pad(seconds)}
          disabled={isRunning}
          onChange={handleUserInput(setSeconds, 99)}
          className="timeInput"
        />
      </div>
      <div className="flex justify-between mx-5">
        <button onClick={start} disabled={isRunning || timeLeft <= 0} className="buttons">
          Start
        </button>
        <button onClick={pause} disabled={!isRunning} className="buttons">
          Pause
        </button>
        <button
          onClick={reset}
          disabled={timeLeft === initialTime && !isRunning}
          className="buttons"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDown;