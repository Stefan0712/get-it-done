import styles from './Home.module.css';





const WorkHistory = () => {
    return ( 
        <div className={`${styles.module} ${'work-history'}`}>
            <div className={styles.header}>
                <h3>Work History</h3>
            </div>
            <div className={styles.content}>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Focus</p>
                    <p className={styles['module-value']}>3</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Breaks</p>
                    <p className={styles['module-value']}>6</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Long Breaks</p>
                    <p className={styles['module-value']}>6</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Total Time</p>
                    <p className={styles['module-value']}>30 minutes</p>
                </div>
            </div>
        </div>
     );
}
 
export default WorkHistory;