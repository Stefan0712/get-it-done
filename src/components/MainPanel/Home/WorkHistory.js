import { formatDate, formatTime } from '../../../helpers';
import styles from './Home.module.css';
import { useSelector } from 'react-redux';




const WorkHistory = () => {
    const date = new Date().toISOString().split("T")[0];
    const history = useSelector(state=>state.appSettings.history)[date];

    const focus = history.reduce((sum, item) => sum + item.focusSessions, 0);
    const shortBreak = history.reduce((sum, item) => sum + item.breaks, 0);
    const longBreak = history.reduce((sum, item) => sum + item.longBreaks, 0);
    const totalTime = history.reduce((sum, item) => sum + item.totalTimeElapsed, 0);
    return ( 
        <div className={`${styles.module} ${'work-history'}`}>
            <div className={styles.header}>
                <h3>Work History</h3>
            </div>
            <div className={styles.content}>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Focus</p>
                    <p className={styles['module-value']}>{focus}</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Breaks</p>
                    <p className={styles['module-value']}>{shortBreak}</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Long Breaks</p>
                    <p className={styles['module-value']}>{longBreak}</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Total Time</p>
                    <p className={styles['module-value']}>{formatTime(totalTime)}</p>
                </div>
            </div>
        </div>
     );
}
 
export default WorkHistory;