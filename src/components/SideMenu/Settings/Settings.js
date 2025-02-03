import { IconLibrary } from '../../../IconLibrary';
import styles from './Settings.module.css';
import useWakeLock from '../../../hooks/useWakeLock';
import { enterFullScreen, exitFullScreen } from '../../../helpers';



const Settings = ({closeSettings}) => {

    const { requestWakeLock, releaseWakeLock } = useWakeLock();

    return ( 
        <div className={styles.settings}>
            <div className={styles.header}>
                <h1>Settings</h1>
                <button onClick={closeSettings}><img src={IconLibrary.Close} alt='close settings'></img></button>
            </div>
            <div className={styles['half-button-set']}>
                <h2>Fullscreen</h2>
                <button onClick={enterFullScreen}>Enable</button>
                <button onClick={exitFullScreen}>Disable</button>
            </div>
            <div className={styles['half-button-set']}>
                <h2>Keep Screen Awake</h2>
                <button onClick={requestWakeLock}>Enable</button>
                <button onClick={releaseWakeLock}>Disable</button>
            </div>
        </div>
     );
}
 
export default Settings;