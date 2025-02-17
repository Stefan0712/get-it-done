import { IconLibrary } from '../../IconLibrary';
import styles from './Pomodoro.module.css';
import { useState, useEffect, useRef } from 'react';
import PomodoroSettings from './PomodoroSettings';
import { useSelector, useDispatch } from 'react-redux';
import { addToHistory } from '../../store/appSettingsSlice';
import MessageModal from '../common/MessageModal';
import {formatTime} from '../../helpers';

const Pomodoro = () => {
    const [showSettings, setShowSettings] = useState(false); 
    const dispatch = useDispatch();
    const settings = useSelector(state => state.appSettings.pomodoroSettings); //all pomodoro related settings from the store

    const intervalRef  = useRef(); //ref for the timer interval

    // Timer states
    const [timeLeft, setTimeLeft] = useState(2); // Set the initial time left to the duration of the focus session since it's always the first session
    const [currentCycle, setCurrentCycle] = useState(1); 
    const [currentSession, setCurrentSession] = useState('focus'); //it can be 'focus', 'break', or 'longBreak'
    const [elapsedTime, setElapsedTime] = useState(0); 
    const [isRunning, setIsRunning] = useState(false); //track if the timer is running
    const [isSessionFinished, setIsSessionFinished] = useState(false); //track if session is finished


    const [focusSessions, setFocusSessions] = useState(0); //counter for focus session
    const [breaks, setBreaks] = useState(0); //counter for short breaks
    const [longBreaks, setLongBreaks] = useState(0); //counter for long breaks


    const [message, setMessage] = useState(null); //state for pop-up message


    const handleSessionEnd = (skip = false) =>{
        console.log('handleSessionEnd started running');
        
        if(isRunning || skip){
            console.log("The function passed the isRunning check")
            setIsRunning(false);

            if(currentSession === 'focus'){
                const newFocusSessions = focusSessions + 1;
                setFocusSessions(prev => prev + 1);
                if(newFocusSessions % settings.longBreakFrequency === 0){
                    setCurrentSession('longBreak');
                    setTimeLeft(settings.longBreakDuration * 60);
                }else{
                    setCurrentSession('break');
                    setTimeLeft(settings.breakDuration * 60);
                }
            }else if(currentSession === 'break'){
                setBreaks(prev => prev + 1);
                setCurrentSession('focus');
                setTimeLeft(settings.focusDuration * 60);
            }else if(currentSession === 'longBreak'){
                setLongBreaks(prev => prev + 1);
                setCurrentSession('focus');
                setTimeLeft(settings.focusDuration * 60);
            }
            clearInterval(intervalRef.current);
            console.log('handleSessionEnd ran successfully')
        }
    }

    const startTimer = () => {
    if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                clearInterval(intervalRef.current); // Stop when time runs out
                handleSessionEnd(); // Handle end of session
                return 0;
                }
                return prevTime - 1;
            });
            }, 1000);
        }
    };
    const pauseTimer = () =>{
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        switch(currentSession){
            case 'focus':
                setTimeLeft(settings.focusDuration * 60);
                break;
            case 'break':
                setTimeLeft(settings.breakDuration * 60);
                break;
            case 'longBreak':
                setTimeLeft(settings.longBreakDuration * 60);
                break;
        }
         // Reset to the initial session time
        setIsRunning(false);
    };
    

    // Effect to handle start/stop logic
    useEffect(() => {
        if (timeLeft > 0 && isRunning) {
            // Timer is running, do nothing, interval is already started
            return;
        }
        // If timer reaches 0, handle session end (e.g., switch sessions)
        if (timeLeft <= 0) {
            handleSessionEnd();
        }
    }, [isRunning, timeLeft]);


    useEffect(() => {
        console.log(isRunning ? 'Running' : 'Not Running');
    }, [isRunning]);

    // Effect to clean up interval when the component unmounts or timer is reset
    useEffect(() => {
        return () => {
            // Cleanup interval on component unmount
            clearInterval(intervalRef.current);
        };
    }, []);
 
    const skipSession = () =>{
        handleSessionEnd(true);
    };
    const handleFinish = () =>{
        console.log("Work session was finished")
    }


    // const handleFinish = () => {
    //     console.log('handleFinish was triggered')
    //     // Log session details
    //     setElapsedTime(0);
    //     const sessionLog = {
    //         startTime: new Date().toISOString(),
    //         finishTime: new Date().toISOString(),
    //         longBreaks,
    //         breaks,
    //         focusSessions
    //     };
    //     dispatch(addToHistory(sessionLog));
    //     resetTimer();
    //     sendNotification({type: 'success', msg: 'Work session is done!'})
    // };
    const sendNotification = (msg) => {
        console.log('sendNotification was triggered')
        if (settings.enableNotifications) {
            setMessage(msg)
        }
    };

    return (
        <div className={styles.pomodoro}>
            {message ? <MessageModal data={message} closeModal={()=>setMessage(null)} /> : null}
            {showSettings && <PomodoroSettings closeSettings={() => setShowSettings(false)} />}
            <button className={styles['settings-button']} onClick={() => setShowSettings(true)}>
                <img src={IconLibrary.Settings} alt="Settings" />
            </button>
           
            <div className={styles.timer}>
                <div className={`${styles['timer-background']} ${isSessionFinished ? styles['animated-session-end'] : ''}`} style={{background: `conic-gradient(#FF8C00 ${(elapsedTime / timeLeft) * 100}%, white ${(elapsedTime / timeLeft) * 100}% 100%)`}}>
                    <div className={styles['timer-content']}>
                        
                        <h3>{currentSession === 'focus' ? 'Focus' : currentSession === 'break' ? 'Break' : 'Long Break'}</h3>
                         <div className={styles.time}>
                            {formatTime(timeLeft)}
                        </div>
                        <p className={styles['sessions-counter']}>{focusSessions}/{breaks}/{longBreaks}</p>
                        <p>{isRunning ? 'Running' : 'Not Running'}</p>
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <button className={styles['small-button']} onClick={resetTimer}>
                    <img src={IconLibrary.Restart} alt="Restart" />
                </button>
                <button className={styles['small-button']} onClick={skipSession}>
                    <img src={IconLibrary.Next} alt="Skip" />
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
