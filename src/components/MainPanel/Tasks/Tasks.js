import { useState, useEffect } from 'react';

import { IconLibrary } from '../../../IconLibrary';

import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import Task from './Task/Task';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTask, togglePin } from '../../../store/tasksSlice';
import { setSelectedTask } from '../../../store/appSettingsSlice';

import EditTask from './EditTask';
import { isPending } from '@reduxjs/toolkit';



const Tasks = ({isTasksExpanded, expandTasks, minimizeTasks}) => {

    const dispatch = useDispatch();


    const tasks = useSelector(state=>state.tasks.tasks)
    const selectedTask = useSelector(state=>state.appSettings.selectedTask);

    const isMaximized = useSelector(state=>state.appSettings.isPomodoroMinimized);

    const [showNewTask, setShowNewTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]); 

    const [selectedCategory, setSelectedCategory] = useState('all');






    useEffect(() => {
        dispatch(setSelectedTask(null));  // Reset selected task
    
        if (!tasks || tasks.length === 0) {
            console.log('No tasks available');
            setFilteredTasks([]);  // Ensure state is cleared
            return;
        }
    
        // Create a new array before sorting to avoid mutating Redux state
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;  // Pinned first
            if (!a.isPinned && b.isPinned) return 1;
            if (!a.isCompleted && b.isCompleted) return -1;  // Not completed before completed
            if (a.isCompleted && !b.isCompleted) return 1;
            return 0;
        });
    
        setFilteredTasks(sortedTasks);
    }, [tasks, dispatch]);
    
    const changeCategory = (category) => {
        if (!tasks) {
            setFilteredTasks([]);
            return;
        }
    
        switch (category) {
            case 'all':
                setFilteredTasks([...tasks]);
                setSelectedCategory('all');
                break;
            case 'completed':
                setFilteredTasks(tasks.filter(item => item.isCompleted && !item.isPinned));
                setSelectedCategory('completed');
                break;
            case 'not-completed':
                setFilteredTasks(tasks.filter(item => !item.isCompleted && !item.isPinned));
                setSelectedCategory('not-completed');
                break;
            case 'pinned':
                setFilteredTasks(tasks.filter(item => item.isPinned));
                setSelectedCategory('pinned');
                break;
            default:
                setFilteredTasks([...tasks]);
                setSelectedCategory('all');
                break;
        }
    };
    const handleSelectTask = (id)=>{
        dispatch(setSelectedTask(id));
    }
    const handleDeleteTask = () =>{
        dispatch(deleteTask(selectedTask));
        dispatch(setSelectedTask(null));
    }
    const handlePinTask = () =>{
        dispatch(togglePin(selectedTask));
        dispatch(setSelectedTask(null));
        console.log(selectedTask)
    }
    const handleEditTask = () =>{
        setShowEditTask(selectedTask);
    }
    return ( 
        <div className={`${styles.tasks} ${isMaximized ? styles['extended-tasks'] : ''} ${isTasksExpanded ? styles['maximized-tasks'] : ''}`}>
            
            {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
            {showEditTask ? <EditTask closeEditTask={()=>setShowEditTask(false)} taskId={showEditTask} /> : null}
            <div className={`${styles.filters} ${isTasksExpanded ? styles.hide : ''}`}>
                <div className={styles['filters-container']}>
                    <button className={`${styles['filter-button']} ${selectedCategory === "all" ? styles['selected-category'] : ''}`} onClick={()=>changeCategory('all')}>All</button>
                    <button className={`${styles['filter-button']} ${selectedCategory === "not-completed" ? styles['selected-category'] : ''}`} onClick={()=>changeCategory('not-completed')}>Not Completed</button>
                    <button className={`${styles['filter-button']} ${selectedCategory === "pinned" ? styles['selected-category'] : ''}`} onClick={()=>changeCategory('pinned')}>Pinned</button>
                    <button className={`${styles['filter-button']} ${selectedCategory === "completed" ? styles['selected-category'] : ''}`} onClick={()=>changeCategory('completed')}>Completed</button>
                </div>
                
            </div>
            <div className={`${styles.header} `}>
                <button className={styles['maximize-tasks-button']} onClick={isTasksExpanded ? minimizeTasks : expandTasks}>
                    <img className='small-icon' src={isTasksExpanded ? IconLibrary.Minimize : IconLibrary.Maximize} alt='toggle tasks maximize'></img>
                </button>       
                <p>Tasks: {filteredTasks?.length}</p>
                {selectedTask ? (
                    <div className={styles['task-buttons']}>
                        <button onClick={handleEditTask}><img src={IconLibrary.Edit} alt='edit selected task'></img></button>
                        <button onClick={handlePinTask}><img src={tasks.some(item=>item.id === selectedTask && item.isPinned) ? IconLibrary.Unpin : IconLibrary.Pin} alt='pin selected task'></img></button>
                        <button onClick={handleDeleteTask}><img src={IconLibrary.Delete} alt='delete selected task'></img></button>
                    </div>
                ) : null}
                <button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>
            </div>
            <div className={styles.container}>
                {filteredTasks && filteredTasks.length > 0 ? 
                    filteredTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                : null}
            </div>
            
        </div>
        );
   
}
 
export default Tasks;