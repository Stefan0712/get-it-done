import { IconLibrary } from '../../IconLibrary';
import { updatePomodoroSettings } from '../../store/appSettingsSlice';
import styles from './Pomodoro.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PomodoroSettings = ({closeSettings}) => {

    const dispatch = useDispatch();

    const settings = useSelector(state=>state.appSettings.pomodoroSettings);

    const [focusDuration, setFocusDuration] = useState(settings.focusDuration || 25);
    const [breakDuration, setBreakDuration] = useState(settings.breakDuration || 5);
    const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration || 30);
    const [includeLongBreaks, setIncludeLongBreaks] = useState(settings.includeLongBreaks || true);
    const [enableNotifications, setEnableNotifications] = useState(settings.enableNotifications || false);
    const [autoSkip, setAutoSkip] = useState(settings.autoSkip || false);
    const [longBreakFrequency, setLongBreakFrequency] = useState(settings.longBreakFrequency || 3)


    
    const handleSave = () =>{
        dispatch(updatePomodoroSettings({focusDuration, breakDuration, longBreakDuration, includeLongBreaks, longBreakFrequency, enableNotifications, autoSkip}));
        console.log(settings)
    }

    return ( 
        <div className={styles.settings}>
            <div className={styles.header}>
                <h2>Pomodoro Settings</h2>
                <button onClick={handleSave}><img style={{height: '25px', width: '25px', marginRight: '20px'}} src={IconLibrary.Save} alt='save pomodoro settings'></img></button>
                <button onClick={closeSettings}><img src={IconLibrary.Close} alt='close pomodoro settings'></img></button>
            </div>
            <div className={styles['settings-container']}>
                <div className={styles['settings-section']}>
                    <div className={styles.top}>
                        <p>Duration of Focus Sessions:</p>
                        <input type='number' min={0} value={focusDuration} onChange={(e)=>setFocusDuration(e.target.value)}></input>
                        <p> minutes</p>
                    </div>
                </div>
                <div className={styles['settings-section']}>
                    <div className={styles.top}>
                        <p>Duration of Break Sessions:</p>
                        <input type='number' min={0} value={breakDuration} onChange={(e)=>setBreakDuration(e.target.value)}></input>
                        <p> minutes</p>
                    </div>
                </div>
                <div className={styles['settings-section']}>
                    <div className={styles.top}>
                        <p>Include long break ?</p>
                        <select value={includeLongBreaks} onChange={(e)=>setIncludeLongBreaks(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <input type='number' name='longBreak' min={0} value={longBreakDuration} onChange={(e)=>setLongBreakDuration(e.target.value)}></input>
                        <p> minutes</p>
                    </div>
                </div>
                <div className={styles['settings-section']}>
                    <div className={styles.top}>
                        <p>Long Break each </p>
                        <input type='number' min={3} value={longBreakFrequency} onChange={(e)=>setLongBreakFrequency(e.target.value)}></input>
                        <p> focus sessions</p>
                    </div>
                </div>
                <div className={styles['settings-section']}>
                    <div className={styles.top}>
                        <p>Enable Notifications</p>
                        <select value={enableNotifications} onChange={(e)=>setEnableNotifications(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
                <div className={styles['settings-section']}>
                    <div className={styles.top}>
                        <p>Auto Skip Sessions</p>
                        <select value={autoSkip} onChange={(e)=>setAutoSkip(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PomodoroSettings;