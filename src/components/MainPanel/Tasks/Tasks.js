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

    //keeps track of what containers are extended
    const [isCompletedExtended, setIsCompletedExtended] = useState(false);
    const [isNotCompletedExtended, setIsNotCompletedExtended] = useState(false);
    const [isPinnedExtended, setIsPinnedExtended] = useState(false);

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
    }
    const togglePinned = () =>{
        if(pinnedTasks.some(task=>task.id===selectedTask) && isPinnedExtended){
            dispatch(setSelectedTask(null));
        }
        setIsPinnedExtended(isPinnedExtended=>!isPinnedExtended);
    }
    const toggleCompleted = () =>{
        if(completedTasks.some(task=>task.id===selectedTask) && isCompletedExtended){
            dispatch(setSelectedTask(null));
        }
        setIsCompletedExtended(isCompletedExtended=>!isCompletedExtended);
    }
    const toggleNotCompleted = () =>{
        if(notCompletedTasks.some(task=>task.id===selectedTask) && isNotCompletedExtended){
            dispatch(setSelectedTask(null));
        }
        setIsNotCompletedExtended(isNotCompletedExtended=>!isNotCompletedExtended);
    }
    if(selectedProject){
        return ( 
            <div className={styles.tasks}>
                {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
                <div className={styles.header}>
                    <h3>Tasks: {tasks?.length || 0}/{completedTasks?.length || 0}</h3>
                    {selectedTask ? (
                        <div className={styles['task-buttons']}>
                            <button onClick={handlePinTask}><img src={IconLibrary.Pin} alt='pin selected task'></img></button>
                            <button onClick={handleDeleteTask}><img src={IconLibrary.Delete} alt='delete selected task'></img></button>
                        </div>
                    ) : null}
                    {selectedProject ? (<button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>) : null}
                </div>
                <div className={styles.container}>

                    {pinnedTasks && pinnedTasks.length > 0 ? (
                        <div className={`${styles['tasks-category']} ${isPinnedExtended ? styles.extend : ''}`}>
                            <div className={styles['tasks-container-header']} onClick={togglePinned}>
                                <h4>Pinned</h4>
                                <p>{pinnedTasks?.length}</p>
                            </div>
                            <div className={styles['tasks-container']}>
                                {pinnedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))}
                            </div>
                        </div>
                    ) : null}
                    {notCompletedTasks && notCompletedTasks.length > 0 ? (
                        <div className={`${styles['tasks-category']} ${isNotCompletedExtended ? styles.extend : ''}`}>
                            <div className={styles['tasks-container-header']} onClick={toggleNotCompleted}>
                                <h4>Not Completed</h4>
                                <p>{notCompletedTasks?.length}</p>
                            </div>
                            <div className={styles['tasks-container']}>
                                {notCompletedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))}
                            </div>
                        </div>
                    ) : null}
                    {completedTasks && completedTasks.length > 0 ? (
                        <div className={`${styles['tasks-category']} ${isCompletedExtended ? styles.extend : ''}`}>
                            <div className={styles['tasks-container-header']} onClick={toggleCompleted}>
                                <h4>Completed</h4>
                                <p>{completedTasks?.length}</p>
                            </div>
                            <div className={styles['tasks-container']}>
                                {completedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))}
                            </div>
                        </div>
                    ) : null}
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