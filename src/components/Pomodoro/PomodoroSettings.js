import { IconLibrary } from '../../IconLibrary';
import { updatePomodoroSettings } from '../../store/appSettingsSlice';
import styles from './Pomodoro.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PomodoroSettings = ({closeSettings}) => {

    const dispatch = useDispatch();

    const settings = useSelector(state=>state.appSettings.pomodoroSettings);

    const [totalDuration, setTotalDuration] = useState(settings.totalDuration || 3);
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
    
    const handleSave = () =>{
        dispatch(updatePomodoroSettings({totalDuration, focusSession: focusDuration, breakSession: breakDuration}));
        closeSettings();
    }

    return ( 
        <div className={styles.settings}>
            <div className={styles.header}>
                <h2>Pomodoro Settings</h2>
                <button onClick={handleSave}><img style={{height: '25px', width: '25px', marginRight: '20px'}} src={IconLibrary.Save} alt='save pomodoro settings'></img></button>
                <button onClick={closeSettings}><img src={IconLibrary.Close} alt='close pomodoro settings'></img></button>
            </div>

            <div className={styles['settings-section']}>
                <div className={styles.top}>
                    <p>No of Cycles:</p>
                    <input type='number' min={0} max={10} value={totalDuration} onChange={(e)=>setTotalDuration(e.target.value)}></input>
                </div>
                <input type='range' min={0} max={10} value={totalDuration} onChange={(e)=>setTotalDuration(e.target.value)}></input>
            </div>
            <div className={styles['settings-section']}>
                <div className={styles.top}>
                    <p>Duration of Focus Sessions:</p>
                    <input type='number' min={0} max={60} value={focusDuration} onChange={(e)=>setFocusDuration(e.target.value)}></input>
                    <p> minutes</p>
                </div>
                <input type='range' min={0} max={60} value={focusDuration} onChange={(e)=>setFocusDuration(e.target.value)}></input>
            </div>
            <div className={styles['settings-section']}>
                <div className={styles.top}>
                    <p>Duration of Break Sessions:</p>
                    <input type='number' min={0} max={60} value={breakDuration} onChange={(e)=>setBreakDuration(e.target.value)}></input>
                    <p> minutes</p>
                </div>
                <input type='range' min={0} max={60} value={breakDuration} onChange={(e)=>setBreakDuration(e.target.value)}></input>
            </div>
            <div className={styles['settings-summary-section']}>
                <div className={styles['session-length']}>
                    <p>Focus Sessions</p>
                    <p>{focusSessions}</p>
                </div>
                <div className={styles['session-length']}>
                    <p>Break Sessions</p>
                    <p>{breakSessions}</p>
                </div>
                <div className={styles['session-length']}>
                    <p>Total Time</p>
                    <p>{(focusDuration+breakSessions)*totalDuration} min</p>
                </div>
            </div>
        </div>
     );
}
 
export default PomodoroSettings;