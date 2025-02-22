import styles from './Home.module.css';


const Summary = () => {
    return ( 
        <div className={`${styles.summaries} ${styles.module}`}>
            <div className={styles.header}>
                <h3>Tasks Summary</h3>
            </div>
            <div className={styles.content}>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Total</p>
                    <p className={styles['module-value']}>12</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Pinned</p>
                    <p className={styles['module-value']}>3</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Completed</p>
                    <p className={styles['module-value']}>6</p>
                </div>
                <div className={styles['module-block']}>
                    <p className={styles['module-title']}>Not Completed</p>
                    <p className={styles['module-value']}>6</p>
                </div>
            </div>
        </div>
     );
}
 
export default Summary;