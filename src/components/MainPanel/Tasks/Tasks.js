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


    const projects = useSelector(state=>state.projects);
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);
    const tasks = useSelector(state=>state.tasks.tasks)
    const selectedTask = useSelector(state=>state.appSettings.selectedTask);
    const [showNewTask, setShowNewTask] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]); //stores all tasks of the selected project

    const [selectedCategory, setSelectedCategory] = useState('all');

    //categorize tasks by completed, not completed, and pinned
    const completedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isCompleted && !item.isPinned) : [];
    const notCompletedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>!item.isCompleted && !item.isPinned) : [];
    const pinnedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isPinned) : [];



    useEffect(() => {
        dispatch(setSelectedTask(null));
        if (!selectedProject) {
            console.log('No project selected');
            return;
        }
        if (!tasks || tasks.length === 0) {
            console.log('No tasks available');
            return;
        }

        const project = projects.find(p => p.id === selectedProject);
        if (!project || !project.tasks) {
            console.log('Project not found or has no tasks');
            return;
        }
        // Filter tasks that belong to the selected project
        const filteredItems = tasks.filter(task => project.tasks.includes(task.id));
    
        // Sort tasks: pinned first, then not completed, then completed
        const sortedTasks = filteredItems.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;  // Pinned first
            if (!a.isPinned && b.isPinned) return 1;
            if (!a.isCompleted && b.isCompleted) return -1;  // Not completed before completed
            if (a.isCompleted && !b.isCompleted) return 1;
            return 0;
        });
    
        setFilteredTasks(sortedTasks);
    }, [selectedProject, tasks]);
    


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
                    <p>Tasks: {selectedCategory === 'all' ? filteredTasks.length : selectedCategory === 'not-completed' ? notCompletedTasks.length : selectedCategory === "completed" ? completedTasks.length : selectedCategory === "pinned" ? pinnedTasks.length : null}</p>
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
                        {filteredTasks && filteredTasks.length > 0 ? 
                            filteredTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
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