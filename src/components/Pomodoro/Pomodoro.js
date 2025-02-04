import { IconLibrary } from '../../IconLibrary';
import styles from './Pomodoro.module.css';
import { useState, useEffect } from 'react';
import PomodoroSettings from './PomodoroSettings';
import { useSelector } from 'react-redux';

const Pomodoro = () => {
    const [showSettings, setShowSettings] = useState(false);
    const settings = useSelector(state => state.appSettings.pomodoroSettings);

    // User settings
    const [totalCycles, setTotalCycles] = useState(settings.totalDuration || 3);
    const [focusDuration, setFocusDuration] = useState(settings.focusDuration || 25);
    const [breakDuration, setBreakDuration] = useState(settings.breakDuration || 5);

    // Timer states
    const [timeLeft, setTimeLeft] = useState(focusDuration * 60); // Time left in seconds
    const [currentCycle, setCurrentCycle] = useState(1);
    const [currentSession, setCurrentSession] = useState('focus');
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);





    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleSessionEnd(); // Function to switch sessions
                    }
                    return prev > 0 ? prev - 1 : 0;
                });
    
                setElapsedTime(prev => prev + 1);
            }, 1000);
    
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const handleSessionEnd = () => {
        if (currentSession === 'focus') {
            if (currentCycle < totalCycles) {
                setCurrentSession('break');
                setTimeLeft(breakDuration * 60);
            } else {
                console.log("Pomodoro completed!");
                resetTimer();
            }
        } else {
            setCurrentCycle(prev => prev + 1);
            if (currentCycle >= totalCycles) {
                console.log("Pomodoro completed!");
                resetTimer();
            } else {
                setCurrentSession('focus');
                setTimeLeft(focusDuration * 60);
            }
        }
    };

    const startTimer = () => setIsRunning(true);
    const pauseTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setCurrentCycle(1);
        setCurrentSession('focus');
        setTimeLeft(focusDuration * 60);
    };
    const skipSession = () => {
        setIsRunning(false);
        handleSessionEnd();
    };

    return (
        <div className={styles.pomodoro}>
            {showSettings && <PomodoroSettings closeSettings={() => setShowSettings(false)} />}
            <button className={styles['settings-button']} onClick={() => setShowSettings(true)}>
                <img src={IconLibrary.Settings} alt="" />
            </button>
            
            <div className={styles.summaries}>
                <p>{currentCycle}/{totalCycles}</p>
            </div>

            <div className={styles.timer}>
                <div className={styles['timer-background']}>
                    <div className={styles['timer-content']}>
                        <h3>{currentSession === 'focus' ? 'Focus' : 'Break'}</h3>
                        <div className={styles.time}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <button onClick={skipSession}>Skip</button>
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <button className={styles['small-button']} onClick={resetTimer}>
                    <img src={IconLibrary.Restart} alt="Restart" />
                </button>
                <button className={styles['small-button']} onClick={isRunning ? pauseTimer : startTimer}>
                    <img src={isRunning ? IconLibrary.Pause : IconLibrary.Start} alt="Pause/Play" />
                </button>
                <button className={styles['small-button']} onClick={resetTimer}>
                    <img src={IconLibrary.Finish} alt="Finish" />
                </button>
                <button className={styles['big-button']}>Skip Task</button>
                <button className={styles['big-button']}>Finish Task</button>
            </div>
        </div>
    );
};

export default Pomodoro;
