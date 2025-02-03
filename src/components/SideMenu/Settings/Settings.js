import { IconLibrary } from '../../../IconLibrary';
import NoSleep from 'nosleep.js';
import styles from './Settings.module.css';
import { enterFullScreen, exitFullScreen } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { resetTasks } from '../../../store/tasksSlice';
import { resetProjects } from '../../../store/projectsSlice';
import { resetAppSettings } from '../../../store/appSettingsSlice';


const Settings = ({closeSettings}) => {

    const dispatch = useDispatch();
    const noSleep = new NoSleep();

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
                        <button onClick={enterFullScreen}>Enable</button>
                        <button onClick={exitFullScreen}>Disable</button>
                    </div>
                    <div className={styles['half-button-set']}>
                        <h2>Keep Screen Awake</h2>
                        <button onClick={()=>noSleep.enable()}>Enable</button>
                        <button onClick={()=>noSleep.disable()}>Disable</button>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles['half-button-set']}>
                        <h2>Reset Items</h2>
                        <button onClick={()=>dispatch(resetProjects())}>Reset Projects</button>
                        <button onClick={()=>dispatch(resetTasks())}>Reset Tasks</button>
                        <button onClick={()=>dispatch(resetAppSettings())}>Reset Settings</button>
                    </div>
                    <div className={styles['half-button-set']}>
                        <h2>Themes</h2>
                        <button onClick={()=>console.log('Dark')}>Dark</button>
                        <button onClick={()=>console.log('Light')}>Light</button>
                        <button onClick={()=>console.log('UWU')}>Kawaii</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Settings;