import styles from './Tasks.module.css';



const Tasks = () => {
    return ( 
        <div className={styles.tasks}>
            <div className={styles.container}>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.task}>
                    <h3>Task name</h3>
                    <input type='checkbox'></input>
                </div>
            </div>
            
        </div>
     );
}
 
export default Tasks;