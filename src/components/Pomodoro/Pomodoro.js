import { IconLibrary } from '../../IconLibrary';
import styles from './Pomodoro.module.css';
import { useState } from 'react';
import PomodoroSettings from './PomodoroSettings';
import { useSelector } from 'react-redux';

const Pomodoro = () => {

    const [showSettings, setShowSettings] = useState(false);
    const settings = useSelector(state=>state.appSettings.pomodoroSettings);

    const [totalDuration, setTotalDuration] = useState(settings.totalDuration || 60);
    const [focusDuration, setFocusDuration] = useState(settings.focusDuration || 25);
    const [breakDuration, setBreakDuration] = useState(settings.breakDuration || 5);

    //calculate sessions
    const calculateSessions = (totalDuration, focusDuration, breakDuration) => {
        // Ensure focus and break durations are at least 1 minute to avoid division errors
        const safeFocus = Math.max(focusDuration, 1);
        const safeBreak = Math.max(breakDuration, 1);
    
        // Calculate the full cycle (one focus + one break)
        const fullCycle = safeFocus + safeBreak;
    
        // Calculate the number of full focus sessions that fit into the total duration
        const focusSessions = Math.floor(totalDuration / fullCycle);
        
        // Ensure there's at least one break session if there is a focus session
        const breakSessions = Math.max(focusSessions - 1, 0);
    
        // Remaining minutes that don't fit into a full cycle
        const remainingMinutes = totalDuration % fullCycle;
    
        return { focusSessions, breakSessions, remainingMinutes };
    };
    
    const { focusSessions, breakSessions, remainingMinutes } = calculateSessions(totalDuration, focusDuration, breakDuration);


    return ( 
        <div className={styles.pomodoro}>
            {showSettings ? <PomodoroSettings closeSettings={()=>setShowSettings(false)} /> : null}
            <div className={styles.timer}>
                <div className={styles['timer-background']}>
                    <div className={styles['timer-content']}>
                        <h3>Focus</h3>
                        <div className={styles.time}>25:00</div>
                        <button>Skip</button>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles['small-button']}>
                    <img src={IconLibrary.Restart}></img>
                </button>
                <button className={styles['small-button']}>
                    <img src={IconLibrary.Pause}></img>
                </button>
                <button className={styles['small-button']}>
                    <img src={IconLibrary.Finish}></img>
                </button>
                <button className={styles['big-button']}>Skip Task</button>
                <button className={styles['big-button']}>Finish Task</button>
            </div>
            <div className={styles['sessions-container']}>
                
                {focusSessions && focusSessions > 0 ? Array.from({ length: focusSessions }).map((_, index) => (
                    <>
                        <div key={'session-'+index} className={styles['focus-session-square']}>
                            <p>{focusDuration}</p>
                        </div>
                        <div key={'break-'+index} className={styles['break-session-square']}>
                            <p>{breakDuration}</p>
                        </div>
                    </>
                  )) : null}
                <div className={styles['total-time']} onClick={()=>setShowSettings(true)}><p>0</p><p>{totalDuration}</p></div>
            </div>
        </div>
     );
}
 
export default Pomodoro;