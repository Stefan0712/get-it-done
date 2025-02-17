import { useState, useEffect, useRef } from "react";

const useCountdown = (initialMinutes) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Start or resume the timer
    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
    };

    // Pause the timer
    const pause = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    // Reset the timer
    const reset = (newMinutes = initialMinutes) => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setTimeLeft(newMinutes * 60);
    };

    useEffect(() => {
        if (timeLeft === 0) {
            pause(); // Stop when it reaches zero
        }
        return () => clearInterval(intervalRef.current);
    }, [timeLeft]);

    return { timeLeft, isRunning, start, pause, reset };
};
