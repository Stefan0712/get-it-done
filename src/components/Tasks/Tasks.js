import { IconLibrary } from '../../IconLibrary';
import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import { useState, useEffect } from 'react';
import Task from './Task/Task';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../../store/tasksSlice';
import { removeTaskFromProject } from '../../store/projectsSlice';



const Tasks = () => {

    const tasks = useSelector(state=>state.tasks);
    const projects = useSelector(state=>state.projects);
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);
    const savedSelectedTask = useSelector(state=>state.appSettings.selectedTask);

    const dispatch = useDispatch();

    const [showNewTask, setShowNewTask] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(savedSelectedTask);

    useEffect(()=>{
        if(selectedProject && tasks && tasks.length > 0){
            console.log('passed the check')
            const project = projects.find(p=>p.id === selectedProject)
            const filteredItems = tasks.filter(task => project.tasks.includes(task.id));
            setFilteredTasks(filteredItems)
        }else{
            console.log('Failed to get tasks')
        }
    },[selectedProject, tasks])


    const handleSelectTask = (id)=>{
        setSelectedTask(id);
        console.log(selectedTask)
    }
    const handleDeleteTask = () =>{
        dispatch(deleteTask(selectedTask));
        dispatch(removeTaskFromProject({projectId: selectedProject, taskId: selectedTask }));
        setSelectedTask(null);
    }
    return ( 
        <div className={styles.tasks}>
            {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
            <div className={styles.header}>
                <h2>Tasks</h2>
                {selectedTask ? (
                    <div className={styles['delete']}>
                        <button onClick={handleDeleteTask}><img src={IconLibrary.Delete} alt='delete selected task'></img></button>
                    </div>
                ) : null}
                {selectedProject ? (<button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>) : null}
            </div>
            <div className={styles.container}>
                <h3>Not Completed</h3>
                {filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>!item.isCompleted).map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />)) : <h5>Select a project</h5>}
                <div className={styles.completed}>
                    <h3>Completed</h3>
                    <div className={styles['completed-container']}>
                        {filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isCompleted).map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />)) : null}
                    </div>
                </div>
            </div>
           
            
        </div>
     );
}
 
export default Tasks;