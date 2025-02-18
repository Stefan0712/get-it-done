import { IconLibrary } from '../../../IconLibrary';
import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import { useState, useEffect } from 'react';
import Task from './Task/Task';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, togglePin } from '../../../store/tasksSlice';
import { removeTaskFromProject } from '../../../store/projectsSlice';
import { setSelectedTask } from '../../../store/appSettingsSlice';



const Tasks = () => {

    const dispatch = useDispatch();


    const tasks = useSelector(state=>state.tasks.tasks);
    const projects = useSelector(state=>state.projects);
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);
    const selectedTask = useSelector(state=>state.appSettings.selectedTask);

    const [showNewTask, setShowNewTask] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]); //stores all tasks of the selected project

    const [selectedCategory, setSelectedCategory] = useState('all');

    //categorize tasks by completed, not completed, and pinned
    const completedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isCompleted && !item.isPinned) : [];
    const notCompletedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>!item.isCompleted && !item.isPinned) : [];
    const pinnedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isPinned) : [];



    useEffect(()=>{
        dispatch(setSelectedTask(null));
        if(selectedProject && tasks && tasks.length > 0){
            const project = projects.find(p=>p.id === selectedProject)
            const filteredItems = tasks.filter(task => project.tasks.includes(task.id));
            setFilteredTasks(filteredItems)
        }else{
            console.log('Failed to get tasks')
        }
    },[selectedProject, tasks])


    const handleSelectTask = (id)=>{
        dispatch(setSelectedTask(id));
    }
    const handleDeleteTask = () =>{
        dispatch(deleteTask(selectedTask));
        dispatch(removeTaskFromProject({projectId: selectedProject, taskId: selectedTask }));
        dispatch(setSelectedTask(null));
    }
    const handlePinTask = () =>{
        dispatch(togglePin(selectedTask));
        dispatch(setSelectedTask(null));
        console.log(selectedTask)
    }
    if(selectedProject){
        return ( 
            <div className={styles.tasks}>
                {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
                    <div className={styles.filters}>
                    <button className={`${styles['filter-button']} ${selectedCategory === "all" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('all')}>All</button>
                    <button className={`${styles['filter-button']} ${selectedCategory === "not-completed" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('not-completed')}>Not Completed</button>
                    <button className={`${styles['filter-button']} ${selectedCategory === "pinned" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('pinned')}>Pinned</button>
                    <button className={`${styles['filter-button']} ${selectedCategory === "completed" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('completed')}>Completed</button>
                </div>
                <div className={styles.header}>
                    <p>Tasks: {selectedCategory === 'all' ? tasks.length : selectedCategory === 'not-completed' ? notCompletedTasks.length : selectedCategory === "completed" ? completedTasks.length : selectedCategory === "pinned" ? pinnedTasks.length : null}</p>
                    {selectedTask ? (
                        <div className={styles['task-buttons']}>
                            <button onClick={handlePinTask}><img src={pinnedTasks.some(item=>item.id === selectedTask) ? IconLibrary.Unpin : IconLibrary.Pin} alt='pin selected task'></img></button>
                            <button onClick={handleDeleteTask}><img src={IconLibrary.Delete} alt='delete selected task'></img></button>
                        </div>
                    ) : null}
                    {selectedProject ? (<button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>) : null}
                </div>
                
                {selectedCategory === 'all' ? (
                    <div className={styles.container}>
                        {tasks && tasks.length > 0 ? 
                            tasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                         : null}
                    </div>
                    ) 
                : null}
                {selectedCategory === 'completed' ? (
                    <div className={styles.container}>
                        {completedTasks && completedTasks.length > 0 ? 
                            completedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                         : null}
                    </div>
                    ) 
                : null}
                {selectedCategory === 'not-completed' ? (
                    <div className={styles.container}>
                        {notCompletedTasks && notCompletedTasks.length > 0 ? 
                            notCompletedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                         : null}
                    </div>
                    ) 
                : null}
                {selectedCategory === 'pinned' ? (
                    <div className={styles.container}>
                        {pinnedTasks && pinnedTasks.length > 0 ? 
                            pinnedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                         : null}
                    </div>
                    ) 
                : null}   
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