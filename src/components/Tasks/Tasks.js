import { IconLibrary } from '../../IconLibrary';
import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import { useState } from 'react';
import Task from './Task/Task';
import { useSelector } from 'react-redux';



const Tasks = () => {

    const [showNewTask, setShowNewTask] = useState(false);
    const tasks = useSelector(state=>state.tasks);
    console.log(tasks)
    return ( 
        <div className={styles.tasks}>
            {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
            <div className={styles.header}>
                <h2>Tasks</h2>
                <button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>
            </div>
            <div className={styles.container}>
                {tasks && tasks.length > 0 ? tasks.map((task, index)=>(<Task data={task} key={index} />)) : <p>No tasks found!</p>}
            </div>
            
        </div>
     );
}
 
export default Tasks;