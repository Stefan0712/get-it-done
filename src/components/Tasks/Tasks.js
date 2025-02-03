import { IconLibrary } from '../../IconLibrary';
import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import { useState, useEffect } from 'react';
import Task from './Task/Task';
import { useSelector } from 'react-redux';



const Tasks = () => {

    const tasks = useSelector(state=>state.tasks);
    const projects = useSelector(state=>state.projects);
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);

    const [showNewTask, setShowNewTask] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([])

    useEffect(()=>{
        if(tasks && tasks.length > 0){
            const project = projects.find(p=>p.id === selectedProject)
            const filteredItems = tasks.filter(task => project.tasks.includes(task.id));
            setFilteredTasks(filteredItems)
        }else{
            console.log('Failed to get tasks')
        }
    },[selectedProject])

    return ( 
        <div className={styles.tasks}>
            {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
            <div className={styles.header}>
                <h2>Tasks</h2>
                <button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>
            </div>
            <div className={styles.container}>
                {filteredTasks && filteredTasks.length > 0 ? filteredTasks.map((task, index)=>(<Task data={task} key={index} />)) : <p>No tasks found!</p>}
            </div>
            
        </div>
     );
}
 
export default Tasks;