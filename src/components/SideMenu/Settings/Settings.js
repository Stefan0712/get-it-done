import { IconLibrary } from '../../../IconLibrary';
import NoSleep from 'nosleep.js';
import styles from './Settings.module.css';
import { enterFullScreen, exitFullScreen } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { resetTasks } from '../../../store/tasksSlice';
import { resetProjects } from '../../../store/projectsSlice';
import { resetAppSettings, toggleScreenAwake, updateSetting } from '../../../store/appSettingsSlice';


const Settings = ({closeSettings}) => {

    const dispatch = useDispatch();
    
    const settings = useSelector((state)=>state.appSettings);



    const handleResetAll = () =>{
        dispatch(resetProjects());
        dispatch(resetTasks());
        dispatch(resetAppSettings());
    }
    const toggleScreenAwakeOn = () =>{
        dispatch(toggleScreenAwake(true))

    }
    const toggleScreenAwakeOff = () =>{
        dispatch(toggleScreenAwake(false))
    }
    return ( 
        <div className={`${styles.settings} ${settings.isPomodoroMinimized ? styles['extended-settings'] : ''}`}>
            <div className={styles.container}>
                <div className={styles.setting}>
                    <h3>Fullscreen</h3>
                    <div className={styles['setting-buttons']}>
                        {settings.isFullscreen ? <button onClick={exitFullScreen}>Disable</button> : <button onClick={enterFullScreen}>Enable</button>}
                    </div>
                </div>
                <div className={styles.setting}>
                    <h3>Keep Screen Awake</h3>
                    <div className={styles['setting-buttons']}>
                        {settings.isScreenAwakeOn ? <button onClick={toggleScreenAwakeOff}>Disable</button> : <button onClick={toggleScreenAwakeOn}>Enable</button>}
                    </div>
                    
                </div>
                <div className={styles.setting}>
                    <h3>Reset Items</h3>
                    <div className={styles['setting-buttons']}>
                        <button onClick={()=>dispatch(resetProjects())}>Projects</button>
                        <button onClick={()=>dispatch(resetTasks())}>Tasks</button>
                        <button onClick={()=>dispatch(resetAppSettings())}>Settings</button>
                        <button onClick={handleResetAll}>All</button>
                    </div>
                    
                </div>
                <div className={styles.setting}>
                    <h3>Themes</h3>
                    <div className={styles['setting-buttons']}>
                        <button onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'dark' }))}>Dark</button>
                        <button onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'light' }))}>Light</button>
                        <button onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'amoled' }))}>AMOLED</button>
                        <button onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'cute' }))}>Kawaii</button>
                    </div>
                    
                </div>
                <div className={styles.setting}>
                    <h3>Show Fullscreen Promp on start</h3>
                    <div className={styles['setting-buttons']}>
                        {settings.showFullScreenPrompt ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: true }))}>Enable</button>}
                    </div>
                    
                </div>
                <div className={styles.setting}>
                    <h3>Show Fullscreen Button</h3>
                    <div className={styles['setting-buttons']}>
                        {settings.showFullscreenButton ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullscreenButton', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullscreenButton', value: true }))}>Enable</button>}
                    </div>
                    
                    
                </div>
                <div className={styles.setting}>
                    <h3>Notifications</h3>
                    <div className={styles['setting-buttons']}>
                        {settings.showNotifications ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showNotifications', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showNotifications', value: true }))}>Enable</button>}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Settings;