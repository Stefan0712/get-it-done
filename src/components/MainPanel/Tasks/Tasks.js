import { IconLibrary } from '../../../IconLibrary';
import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import { useState, useEffect } from 'react';
import Task from './Task/Task';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../../../store/tasksSlice';
import { removeTaskFromProject } from '../../../store/projectsSlice';



const Tasks = () => {

    const tasks = useSelector(state=>state.tasks);
    const projects = useSelector(state=>state.projects);
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);
    const savedSelectedTask = useSelector(state=>state.appSettings.selectedTask);

    const dispatch = useDispatch();

    const [showNewTask, setShowNewTask] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(savedSelectedTask);

    const completedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>!item.isCompleted) : null;
    const notCompletedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isCompleted) : null;
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
    if(selectedProject){
        return ( 
            <div className={styles.tasks}>
                {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
                <div className={styles.header}>
                    <h3>Tasks: {tasks.length || 0}/{completedTasks || 0}</h3>
                    {selectedTask ? (
                        <div className={styles['delete']}>
                            <button onClick={handleDeleteTask}><img src={IconLibrary.Delete} alt='delete selected task'></img></button>
                        </div>
                    ) : null}
                    {selectedProject ? (<button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>) : null}
                </div>
                <div className={styles.container}>
                    <h3>Not Completed</h3>
                    {completedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))}
                    <div className={styles.completed}>
                        <h3>Completed</h3>
                        <div className={styles['completed-container']}>
                            {notCompletedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))}
                        </div>
                    </div>
                </div>
               
                
            </div>
         );
    }else{
        return (
            <div className={`${styles.tasks} ${styles['no-project-selected']}`}>
                {!projects || projects?.length === 0 ? <h3>Create a project first</h3> : projects && projects.length > 0 ? <h3>Please select a project</h3> : <h3>Something went wrong</h3>}
            </div>
        )
    }
}
 
export default Tasks;