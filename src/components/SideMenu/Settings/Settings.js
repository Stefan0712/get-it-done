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
                <div className={styles.section}>
                    <div className={styles['half-button-set']}>
                        <h2>Fullscreen</h2>
                        {settings.isFullscreen ? <button onClick={exitFullScreen}>Disable</button> : <button onClick={enterFullScreen}>Enable</button>}
                    </div>
                    <div className={styles['half-button-set']}>
                        <h2>Keep Screen Awake</h2>
                        {settings.isScreenAwakeOn ? <button onClick={toggleScreenAwakeOff}>Disable</button> : <button onClick={toggleScreenAwakeOn}>Enable</button>}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles['half-button-set']}>
                        <h2>Reset Items</h2>
                        <button onClick={()=>dispatch(resetProjects())}>Projects</button>
                        <button onClick={()=>dispatch(resetTasks())}>Tasks</button>
                        <button onClick={()=>dispatch(resetAppSettings())}>Settings</button>
                        <button onClick={()=>handleResetAll}>All</button>
                    </div>
                    <div className={styles['half-button-set']}>
                        <h2>Themes</h2>
                        <button onClick={()=>console.log('Dark')}>Dark</button>
                        <button onClick={()=>console.log('Light')}>Light</button>
                        <button onClick={()=>console.log('UWU')}>Kawaii</button>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles['half-button-set']}>
                        <h2>Show Fullscreen Promp on start</h2>
                        {settings.showFullScreenPrompt ? <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: false }))}>Disable</button> : <button onClick={()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: true }))}>Enable</button>}
                    </div>
                    <div className={styles['half-button-set']}>
                        <h2>Keep Screen Awake</h2>
                        {settings.isScreenAwakeOn ? <button onClick={toggleScreenAwakeOff}>Disable</button> : <button onClick={toggleScreenAwakeOn}>Enable</button>}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Settings;