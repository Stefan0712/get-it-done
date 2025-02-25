import { IconLibrary } from '../../IconLibrary';
import { updatePomodoroSettings, updatePomodoroSetting } from '../../store/appSettingsSlice';
import Toggle from '../common/Toggle';
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
        closeSettings();
    }
    const handleSettingUpdate = (settingKey) =>{
        
        if(settings[settingKey]){
            console.log('Setting was true', settingKey)
            dispatch(updatePomodoroSetting({ settingKey, value: false }))
        }else if(!settings[settingKey]){
            console.log('Setting was false')
            dispatch(updatePomodoroSetting({ settingKey, value: true }))
        }
    }
    return ( 
        <div className={styles.settings}>
            <div className={styles.header}>
                <h2>Pomodoro Settings</h2>
                <button onClick={handleSave}><img style={{height: '25px', width: '25px', marginRight: '20px'}} src={IconLibrary.Save} alt='save pomodoro settings'></img></button>
                <button onClick={closeSettings}><img className='medium-icon' src={IconLibrary.Close} alt='close pomodoro settings'></img></button>
            </div>
            <div className={styles['settings-container']}>
                <div className={styles['setting']}>
                    <p>Duration of Focus Sessions: (min)</p>
                    <input type='number' min={0} value={focusDuration} onChange={(e)=>setFocusDuration(e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Duration of Break Sessions: (min)</p>
                    <input type='number' min={0} value={breakDuration} onChange={(e)=>setBreakDuration(e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Include long break</p>
                    <Toggle isActive={includeLongBreaks} functionToRun={includeLongBreaks ? ()=>setIncludeLongBreaks(false) : ()=>setIncludeLongBreaks(true)} />
                </div>
                {includeLongBreaks ? 
                    <div className={styles['setting']}>
                        <p>Duration of Long Breaks: (min)</p>
                        <input type='number' name='longBreak' min={0} value={longBreakDuration} onChange={(e)=>setLongBreakDuration(e.target.value)}></input>
                    </div> 
                : null}
                <div className={styles['setting']}>
                    <p>Long Break each </p>
                    <input type='number' min={3} value={longBreakFrequency} onChange={(e)=>setLongBreakFrequency(e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Enable Notifications</p>
                    <Toggle isActive={enableNotifications} functionToRun={enableNotifications ? ()=>setEnableNotifications(false) : ()=>setEnableNotifications(true)} />
                </div>
                <div className={styles['setting']}>
                    <p>Auto Skip Sessions</p>
                    <Toggle isActive={autoSkip} functionToRun={autoSkip ? ()=>setAutoSkip(false) : ()=>setAutoSkip(true)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Timer Progress</p>
                    <Toggle isActive={settings.showTimerRing} functionToRun={()=>handleSettingUpdate('showTimerRing')} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Minimized Timer Progress</p>
                    <Toggle isActive={settings.showMinimizedTimerProgress} functionToRun={()=>handleSettingUpdate('showMinimizedTimerProgress')} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Session End Animation</p>
                    <Toggle isActive={settings.sessionEndAnimation} functionToRun={()=>handleSettingUpdate('sessionEndAnimation')} />
                </div>
                <div className={styles['setting']}>
                    <p> Show Minimize Button</p>
                    <Toggle isActive={settings.showMinimizeButton} functionToRun={()=>handleSettingUpdate('showMinimizeButton')} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Sessions Counter</p>
                    <Toggle isActive={settings.showSessionCounter} functionToRun={()=>handleSettingUpdate('showSessionCounter')} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Current Session</p>
                    <Toggle isActive={settings.showCurrentSession} functionToRun={()=>handleSettingUpdate('showCurrentSession')} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Buttons</p>
                    <Toggle isActive={settings.showBottomButtons} functionToRun={()=>handleSettingUpdate('showBottomButtons')} />
                </div>
            </div>
        </div>
     );
}
 
export default PomodoroSettings;