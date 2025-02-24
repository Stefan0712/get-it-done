import styles from './Home.module.css';
import { useSelector } from 'react-redux';


const Summary = () => {


    const tasks = useSelector(state=>state.tasks.tasks);
    return ( 
        <div className={`${styles.summaries} ${styles.module}`}>
            <div className={styles.header}>
                <h3>Tasks Summary</h3>
            </div>
            <div className={styles.content}>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Total</p>
                    <p className={styles['module-value']}>{tasks?.length}</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Pinned</p>
                    <p className={styles['module-value']}>{tasks?.filter(item=>item.isPinned).length}</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Completed</p>
                    <p className={styles['module-value']}>{tasks?.filter(item=>item.isCompleted).length}</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Not Completed</p>
                    <p className={styles['module-value']}>{tasks?.filter(item=>!item.isCompleted).length}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Summary;