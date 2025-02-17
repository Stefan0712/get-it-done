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
    const noSleep = new NoSleep();
    const settings = useSelector((state)=>state.appSettings);



    const handleResetAll = () =>{
        dispatch(resetProjects());
        dispatch(resetTasks());
        dispatch(resetAppSettings());
    }
    const toggleScreenAwakeOn = () =>{
        noSleep.enable();
        dispatch(toggleScreenAwake(true))

    }
    const toggleScreenAwakeOff = () =>{
        noSleep.disable();
        dispatch(toggleScreenAwake(false))
    }
    return ( 
        <div className={styles.settings}>
            <div className={styles.header}>
                <h1>Settings</h1>
                <button onClick={closeSettings}><img src={IconLibrary.Close} alt='close settings'></img></button>
            </div>
            <div className={styles.container}>
                <div className={styles.setting}>
                    <h3>Fullscreen</h3>
                    {settings.isFullscreen ? <button onClick={exitFullScreen}>Disable</button> : <button onClick={enterFullScreen}>Enable</button>}
                </div>
                <div className={styles.setting}>
                    <h3>Keep Screen Awake</h3>
                    {settings.isScreenAwakeOn ? <button onClick={toggleScreenAwakeOff}>Disable</button> : <button onClick={toggleScreenAwakeOn}>Enable</button>}
                </div>
                <div className={styles.setting}>
                    <h3>Reset Items</h3>
                    <button onClick={()=>dispatch(resetProjects())}>Projects</button>
                    <button onClick={()=>dispatch(resetTasks())}>Tasks</button>
                    <button onClick={()=>dispatch(resetAppSettings())}>Settings</button>
                    <button onClick={()=>handleResetAll}>All</button>
                </div>
                <div className={styles.setting}>
                    <h3>Themes</h3>
                    <button onClick={()=>console.log('Dark')}>Dark</button>
                    <button onClick={()=>console.log('Light')}>Light</button>
                    <button onClick={()=>console.log('UWU')}>Kawaii</button>
                </div>
                <div className={styles.setting}>
                    <h3>Show Fullscreen Promp on start</h3>
                    {settings.showFullScreenPrompt ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: true }))}>Enable</button>}
                </div>
                <div className={styles.setting}>
                    <h3>Show Fullscreen Button</h3>
                    {settings.showFullscreenButton ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullscreenButton', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullscreenButton', value: true }))}>Enable</button>}
                </div>
                <div className={styles.setting}>
                    <h3>Notifications</h3>
                    {settings.showNotifications ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showNotifications', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showNotifications', value: true }))}>Enable</button>}
                </div>
            </div>
        </div>
     );
}
 
export default Settings;