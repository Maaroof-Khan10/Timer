import React, {useState, useRef} from "react";

const CountDown = () => {
    const [timerValue, setTimerValue] = useState(0);
    const [timer, setTimer] = useState(0);
    const [startCount, setStartCount] = useState(false)
    const intervalRef = useRef(null); // Using ref makes the value persistant

    const startTimer = () => {
        if (!startCount) {
            setStartCount(true);
            if (timer !== 0 && timerValue === 0) {
                setTimerValue(timer);
                console.log(timer, timerValue);
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setStartCount(false)
                        return 0
                    }
                    return prev - 1;
                })
            }, 1000)
        }
    }

    const pauseTimer = () => {
        setStartCount(false)
        clearInterval(intervalRef.current);
    }

    const resetTimer = () => {
        pauseTimer();
        setTimer(timerValue);
    }
    return (
        <div>
            <input value={timer} onChange={(e) => {setTimer(Number(e.target.value))}}></input>
            <button onClick={() => {startTimer()}}>Start</button>
            <button onClick={() => {pauseTimer()}}>Pause</button>
            <button onClick={() => {resetTimer()}}>Reset</button>
        </div>
    )
}

export default CountDown;