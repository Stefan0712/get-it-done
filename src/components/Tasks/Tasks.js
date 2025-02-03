import { IconLibrary } from '../../IconLibrary';
import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import { useState } from 'react';



const Tasks = () => {

    const [showNewTask, setShowNewTask] = useState(false)

    return ( 
        <div className={styles.tasks}>
            {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
            <div className={styles.header}>
                <h2>Tasks</h2>
                <button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>
            </div>
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