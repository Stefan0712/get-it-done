import { IconLibrary } from '../../IconLibrary';
import styles from './Pomodoro.module.css';
import { useState, useEffect } from 'react';
import PomodoroSettings from './PomodoroSettings';
import { useSelector, useDispatch } from 'react-redux';
import { addToHistory } from '../../store/appSettingsSlice';
import MessageModal from '../common/MessageModal';

const Pomodoro = () => {
    const [showSettings, setShowSettings] = useState(false);
    const dispatch = useDispatch();
    const settings = useSelector(state => state.appSettings.pomodoroSettings);

    // Timer states
    const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60); // Time left in seconds
    const [currentCycle, setCurrentCycle] = useState(1);
    const [currentSession, setCurrentSession] = useState('focus');
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [focusSessions, setFocusSessions] = useState(0);
    const [breaks, setBreaks] = useState(0);
    const [longBreaks, setLongBreaks] = useState(0);

    const [message, setMessage] = useState(null);

    // Total cycles before long break
    const totalCycles = settings.longBreakFrequency;

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
            setFocusSessions(focusSessions=>focusSessions+1)
            // If it's focus and we're at the required frequency, switch to long break
            if (settings.includeLongBreaks && currentCycle % totalCycles === 0) {
                setCurrentSession('longBreak');
                setTimeLeft(settings.longBreakDuration * 60);
            } else {
                setCurrentSession('break');
                setTimeLeft(settings.breakDuration * 60);
            }
        } else if (currentSession === 'break' || currentSession === 'longBreak') {
            if(currentSession === 'break'){
                setBreaks(breaks=>breaks+1);
            }else if(currentSession === 'longBreak'){
                setLongBreaks(longBreaks=>longBreaks+1);
            };
            setCurrentCycle(prev => prev + 1);
            if (currentCycle >= totalCycles) {
                resetTimer();
            } else {
                setCurrentSession('focus');
                setTimeLeft(settings.focusDuration * 60);
            }
        }
    };

    const startTimer = () => setIsRunning(true);
    
    const pauseTimer = () => setIsRunning(false);

    const resetTimer = () => {
        setIsRunning(false);
        setCurrentCycle(1);
        setCurrentSession('focus');
        setTimeLeft(settings.focusDuration * 60);
        setMessage({type: 'info', msg: 'The timer was reset'})
    };

    const skipSession = () => {
        setIsRunning(false);
        handleSessionEnd();
        setElapsedTime(0);
        setMessage({type: 'info', msg: 'Session was skipped'})
    };

    const handleFinish = () => {
        // Log session details
        setElapsedTime(0);
        const sessionLog = {
            startTime: new Date().toISOString(),
            finishTime: new Date().toISOString(),
            longBreaks,
            breaks,
            focusSessions
        };
        dispatch(addToHistory(sessionLog));
        resetTimer();
        setMessage({type: 'success', msg: 'Work session is done!'})
    };

    const sendNotification = () => {
        if (settings.enableNotifications) {
            currentSession === 'focus' ? setMessage({type: 'info', msg: 'Focus time is over, take a break!'}) : setMessage({type: 'info', msg: 'Break time is over, get back to work!'})
        }
    };

    useEffect(() => {
        if (timeLeft === 0) {
            sendNotification();
        }
    }, [timeLeft]);

    return (
        <div className={styles.pomodoro}>
            {message ? <MessageModal data={message} closeModal={()=>setMessage(null)} /> : null}
            {showSettings && <PomodoroSettings closeSettings={() => setShowSettings(false)} />}
            <button className={styles['settings-button']} onClick={() => setShowSettings(true)}>
                <img src={IconLibrary.Settings} alt="Settings" />
            </button>
            <div className={styles.top}>
                <p>Focus Sessions: {focusSessions}</p>
                <p>Short Breaks: {breaks}</p>
                <p>Long Breaks: {longBreaks}</p>
            </div>
            <div className={styles.timer}>
                <div className={styles['timer-background']} style={{background: `conic-gradient(#FF8C00 ${(elapsedTime / timeLeft)*100}%, white ${(elapsedTime / timeLeft)*100}% 100%)` }}>
                    <div className={styles['timer-content']}>
                        <h3>{currentSession === 'focus' ? 'Focus' : currentSession === 'break' ? 'Break' : 'Long Break'}</h3>
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
                <button className={styles['small-button']} onClick={handleFinish}>
                    <img src={IconLibrary.Finish} alt="Finish" />
                </button>
            </div>
        </div>
    );
};

export default Pomodoro;
