import React, {useState, useRef} from "react";

const CountDown = () => {
    const [timerValue, setTimerValue] = useState(0)
    const [timer, setTimer] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null); // Using ref makes the value persistant

    const startTimer = () => {
        setPaused(false)
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (timerValue > 0 && timer === 0) {
            setTimer(timerValue);
        }

        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0
                }
                return prev - 1;
            })
        }, 1000)
    }

    const pauseTimer = () => {
        setPaused(true);
        clearInterval(intervalRef.current);
    }

    const resetTimer = () => {
        pauseTimer();
        setTimer(timerValue);
    }
    return (
        <div>
            <input value={timerValue} onChange={(e) => {setTimerValue(e.target.value)}}></input>
            <p>Timer: {timer}</p>
            <button onClick={() => {if (timer === 0 || paused) {startTimer()}}}>Start</button>
            <button onClick={() => {pauseTimer()}}>Pause</button>
            <button onClick={() => {resetTimer()}}>Reset</button>
        </div>
    )
}

export default CountDown;