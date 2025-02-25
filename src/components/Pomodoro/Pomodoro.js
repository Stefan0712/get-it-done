import { IconLibrary } from '../../IconLibrary';
import styles from './Pomodoro.module.css';
import { useState, useEffect, useRef } from 'react';
import PomodoroSettings from './PomodoroSettings';
import { useSelector, useDispatch } from 'react-redux';
import { addToHistory, updateSetting } from '../../store/appSettingsSlice';
import MessageModal from '../common/MessageModal';
import {formatTime} from '../../helpers';

const Pomodoro = () => {
    const [showSettings, setShowSettings] = useState(false); 
    const dispatch = useDispatch();
    const settings = useSelector(state => state.appSettings.pomodoroSettings); // All pomodoro related settings from the store
    const isMinimized = useSelector(state=>state.appSettings.isPomodoroMinimized);
    const intervalRef  = useRef(); // Ref for the timer interval

    // Timer states
    const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60); // Set the initial time left to the duration of the focus session since it's always the first session
    const [currentSession, setCurrentSession] = useState('focus'); // It can be 'focus', 'break', or 'longBreak'
    const [isRunning, setIsRunning] = useState(false); // Track if the timer is running
    const [isSessionFinished, setIsSessionFinished] = useState(false); // Track if session is finished
    const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

    const [focusSessions, setFocusSessions] = useState(1); // Counter for focus session
    const [breaks, setBreaks] = useState(0); // Counter for short breaks
    const [longBreaks, setLongBreaks] = useState(0); // Counter for long breaks

    const [startTime, setStartTime] = useState(null);
    const [action, setAction] = useState('Not Started');
    const [message, setMessage] = useState(null); // State for pop-up message
    const [isActive, setIsActive] = useState(false);

    const [areButtonsHidden, setAreButtonsHidden] = useState(false);


    const handleSessionEnd = (skip = false) =>{
        // Run the function only if the timer is not running or of the skip function was triggered. Since the timer might be running when the skip buttons is pressed, if skip is true then it runs the function even if the timer is still running
        if(isRunning || skip){
            setIsRunning(false); 
            setAction('Session ended')
            if(!skip){
                setIsSessionFinished(true);
            }
            if(currentSession === 'focus'){
                const newFocusSessions = focusSessions + 1; // A "copy" of what the focusSessions state is supposed to be after updating them. I am using that since updating the state might not update on time and I need to use it right away
                
                if((newFocusSessions - 1) % settings.longBreakFrequency === 0){ // Assuming that all cycles includes a focus session as the first session, I am using them to know if it's time for a long or short break
                    setCurrentSession('longBreak');
                    setLongBreaks(prev => prev + 1);
                    setTimeLeft(settings.longBreakDuration * 60); // It multiply by 60 because the duration is in minutes
                }else{ // If the current cycle no is not divisible by the frequency of long breaks, then make next session a normal break
                    setCurrentSession('break');
                    setBreaks(prev => prev + 1);
                    setTimeLeft(settings.breakDuration * 60);
                }
            }else if(currentSession === 'break'){
                setCurrentSession('focus');
                setFocusSessions(prev => prev + 1); // Update the counter of focus sessions
                setTimeLeft(settings.focusDuration * 60);
            }else if(currentSession === 'longBreak'){
                setCurrentSession('focus');
                setFocusSessions(prev => prev + 1); // Update the counter of focus sessions
                setTimeLeft(settings.focusDuration * 60);
            }
            clearInterval(intervalRef.current);
            if(settings.autoSkip){
                startTimer();
            }
        }
    }

    const startTimer = () => {
        if (!isRunning) { // Start the timer only if running
            // Save the date and time of when the timer is started for the first time only for logging purposes
            if(!startTime){
                setStartTime(new Date().toISOString());
            }
            setIsActive(true);
            setAction('Running')
            setIsSessionFinished(false);
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

    // Handles pausing the timer
    const pauseTimer = () =>{
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setAction('Paused')
    }

    // Reset the timer by sending a notification and then by setting the time left to whatever current session is and their corresponding values from settings
    const resetTimer = () => {
        sendNotification({type: 'info', msg: 'The timer was reset!'})
        clearInterval(intervalRef.current);
        setIsSessionFinished(false);
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
        setAction('Session Reset')
        setIsRunning(false); // Pause the timer
    };
    

    // Effect to handle start/stop logic
    useEffect(() => {
        // If the timer is running and there is time left, then do nothing
        if (timeLeft > 0 && isRunning) {
            setTotalTimeElapsed(prev => prev + 1)
            return;
        }
        // If timer reaches 0, end session
        if (timeLeft <= 0) {
            handleSessionEnd();
        }
    }, [isRunning, timeLeft]);

    // Effect to clean up interval when the component unmounts or timer is reset
    useEffect(() => {
        return () => {
            // Cleanup interval on component unmount
            clearInterval(intervalRef.current);
        };
    }, []);
    

    // Handles skipping session by showing a notification and triggering handleSessionEnd with "true" parameter so the function can know the session was skipped
    const skipSession = () =>{
        sendNotification({type: 'info', msg: 'Session was skipped!'})
        handleSessionEnd(true);
        setAction("Skipped")
    };
    
    // Resets all values to default state
    const resetWorkSession = () =>{
        resetTimer();
        setIsRunning(false);
        setCurrentSession('focus');
        setTimeLeft(settings.focusDuration * 60);
        setFocusSessions(0);
        setBreaks(0);
        setLongBreaks(0);
        setTotalTimeElapsed(0);
        setAction('Not Started');
        setIsActive(false);
    }

    const handleFinish = () => {
        // Gather data about current work session
        const sessionLog = {
            startTime,
            finishTime: new Date().toISOString(),
            totalTimeElapsed,
            longBreaks,
            breaks,
            focusSessions
        };
        console.log(sessionLog)
        dispatch(addToHistory(sessionLog));
        resetWorkSession();
        sendNotification({type: 'success', msg: 'Work session is done!'})
        setAction('Finished')
    };
   
    const sendNotification = (msg) => {
        //show message modal if notifications are enabled or if it's urgent
        if (settings.enableNotifications || msg.bypassSetting) {
            setMessage(msg)
        }
    };
    // Get percentage of elapsed time
    const percentageElapsed = () => {
        // Check the current session to know what value to use as totalDuration
        const totalDuration = currentSession === "focus" 
            ? settings.focusDuration 
            : currentSession === "break" 
            ? settings.breakDuration 
            : currentSession === "longBreak" 
            ? settings.longBreakDuration 
            : 0;
    
        const totalDurationInSeconds = totalDuration * 60; // Convert minutes to seconds
        const elapsedTime = totalDurationInSeconds - timeLeft; // Calculate elapsed time
        return ((elapsedTime / totalDurationInSeconds) * 100).toFixed(1); // Calculate percentage of elapsed time and round it to 1 decimal
    };

    const enableSettings = () =>{
        if(!isActive){
            setShowSettings(true);
        }else{
            sendNotification({type: 'fail', bypassSetting: true, msg: "Can't change setting while work session is active!"})
        }
    }
    const formatTimeForMinimizedTimer = (time) => {
        const [minutes, seconds] = time.split(":"); // Splitting MM:SS format
    
        return (
            <div className={styles['minimized-time']}>
                <p>{minutes}</p>
                <p>{seconds}</p>
            </div>
        );
    };
    const handleMinimizeTimer = () =>{
        dispatch(updateSetting({ settingKey: 'isPomodoroMinimized', value: true}));
        console.log('Minimize Timer function was triggered')
    }
    const handleMaximizeTimer = () =>{
        dispatch(updateSetting({ settingKey: 'isPomodoroMinimized', value: false}))
        console.log('Maximize Timer function was triggered')
    }
    if(!isMinimized){
        return (
            <div className={styles.pomodoro} >
                {message ? <MessageModal data={message} closeModal={()=>setMessage(null)} /> : null}
                {showSettings && totalTimeElapsed === 0 ? <PomodoroSettings closeSettings={() => setShowSettings(false)} /> : null}
                
               
                <div className={styles.timer}>
                    <button className={styles['settings-button']} onClick={enableSettings}>
                        <img className='medium-icon' src={IconLibrary.Settings} alt="Settings" />
                    </button>
                    {settings.showMinimizeButton ? (
                        <button className={styles['minimize-button']} onClick={()=>handleMinimizeTimer()} >
                            <img className='medium-icon' src={IconLibrary.Minimize} alt="minimize pomodoro" />
                        </button>
                    ) : null}
                    <div className={`${styles['timer-background']} ${isSessionFinished && settings.sessionEndAnimation ? styles['animated-session-end'] : ''}`} style={settings.showTimerRing ? {background: `conic-gradient(var(--accent-color) ${percentageElapsed()}%, var(--timer-border-color) ${percentageElapsed()}% 100%)`} : {background: 'transparent'}}>
                        <div className={styles['timer-content']}>
                            
                            <div className={`${styles['timer-info']} ${areButtonsHidden ? styles['expanded-info'] : ''}`}  onClick={isRunning ? pauseTimer : startTimer}>
                                {settings.showCurrentSession ? (<h3>{currentSession === 'focus' ? 'Focus' : currentSession === 'break' ? 'Break' : 'Long Break'}</h3>) : null}
                                {settings.showSessionCounter ? (
                                    <div className={styles['sessions-counter']}>
                                        <p className={currentSession === 'focus' ? styles['current-section-counter'] : ''}>{focusSessions}</p>/
                                        <p className={currentSession === 'break' ? styles['current-section-counter'] : ''}>{breaks}</p>/
                                        <p className={currentSession === 'longBreak' ? styles['current-section-counter'] : ''}>{longBreaks}</p>
                                    </div>
                                ) : null}
                                <div className={styles.time}>
                                    {formatTime(timeLeft)}
                                </div>
                                
                            </div>
                            {settings.showBottomButtons ? (
                                <div className={`${styles.buttons} ${areButtonsHidden ? styles['minimized-buttons'] : ''}`} >
                                    <div className={`${styles['buttons-container']} ${areButtonsHidden ? 'hide' : ''}`}>
                                        <button onClick={resetTimer}>
                                            <img className='medium-icon' src={IconLibrary.Restart} alt="Restart" />
                                        </button>
                                        <button onClick={skipSession}>
                                            <img className='medium-icon' src={IconLibrary.Next} alt="Skip" />
                                        </button>
                                        <button onClick={isRunning ? pauseTimer : startTimer}>
                                            <img className='medium-icon' src={isRunning ? IconLibrary.Pause : IconLibrary.Start} alt="Pause/Play" />
                                        </button>
                                        <button onClick={handleFinish}>
                                            <img className='medium-icon' src={IconLibrary.Finish} alt="Finish" />
                                        </button>
                                        <button onClick={()=>setAreButtonsHidden(true)}>
                                            <img className='small-icon' src={IconLibrary.ExpandRight} style={{transform: 'rotateZ(90deg)'}} alt='hide timer buttons'></img>
                                        </button>
                                    </div>
                                    <button className={`${styles['expand-buttons-button']} ${areButtonsHidden ? '' : 'hide'}`} onClick={()=>setAreButtonsHidden(false)}>
                                        <img className='icon' src={IconLibrary.ExpandRight} style={{transform: 'rotateZ(-90deg)'}} alt='show timer buttons' />
                                    </button>
                                </div>
                            ) : null}
                        </div>
                        
                    </div>
                    
                </div>
    
                
                    
            </div>
        );
    }else if(isMinimized){
        return (
            <div className={styles['minimized-pomodoro']} style={settings.showMinimizedTimerProgress ? { '--progress': `${percentageElapsed()}%`,} : {background: 'transparent'}}>
                <button className={styles['maximize-button']} onClick={handleMaximizeTimer}>
                    <img className='medium-icon' src={IconLibrary.Maximize} alt="enable pomodoro" />
                </button>
                <div className={styles.info}>
                    <div className={`${styles.time} ${isSessionFinished ? styles.isFinished : ''}`}>
                        {formatTimeForMinimizedTimer(formatTime(timeLeft))}
                    </div>
                </div>

                <div className={styles.minimizedButtons}>
                    <button onClick={resetTimer}>
                        <img className='medium-icon' src={IconLibrary.Restart} alt="Restart" />
                    </button>
                    <button onClick={skipSession}>
                        <img className='medium-icon' src={IconLibrary.Next} alt="Skip" />
                    </button>
                    <button onClick={isRunning ? pauseTimer : startTimer}>
                        <img className='medium-icon' src={isRunning ? IconLibrary.Pause : IconLibrary.Start} alt="Pause/Play" />
                    </button>
                    <button onClick={handleFinish}>
                        <img className='medium-icon' src={IconLibrary.Finish} alt="Finish" />
                    </button>
                </div>
        </div>
        )
    }
    
};

export default Pomodoro;
