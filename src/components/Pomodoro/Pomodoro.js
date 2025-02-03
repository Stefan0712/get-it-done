import { IconLibrary } from '../../IconLibrary';
import styles from './Pomodoro.module.css';
import { useState } from 'react';
import PomodoroSettings from './PomodoroSettings';

const Pomodoro = () => {

    const [showSettings, setShowSettings] = useState(false);


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
                <div className={styles['focus-session-square']}><p>25:00</p></div>
                <div className={styles['break-session-square']}><p>25:00</p></div>
                <div className={styles['focus-session-square']}><p>25:00</p></div>
                <div className={styles['break-session-square']}><p>25:00</p></div>
                <div className={styles['focus-session-square']}><p>25:00</p></div>
                <div className={styles['total-time']} onClick={()=>setShowSettings(true)}><p>00:00</p><p>01:00</p></div>
            </div>
        </div>
     );
}
 
export default Pomodoro;