import { useState, useEffect } from 'react';

import { IconLibrary } from '../../../IconLibrary';

import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import Task from './Task/Task';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTask, restoreTask, togglePin } from '../../../store/tasksSlice';
import { setSelectedTask } from '../../../store/appSettingsSlice';

import EditTask from './EditTask';



const Tasks = () => {

    const dispatch = useDispatch();


    const tasks = useSelector(state=>state.tasks.tasks)
    const selectedTask = useSelector(state=>state.appSettings.selectedTask);
    const deletedTasks = useSelector(state=>state.tasks.deleted);

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
        dispatch(setSelectedTask(null));
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
            case 'deleted':
                setFilteredTasks(deletedTasks || []);
                setSelectedCategory('deleted');
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
    const handleRestoreTask = () =>{
        dispatch(restoreTask(selectedTask));
        dispatch(setSelectedTask(null));
        setSelectedCategory('all');
    }
    const handlePinTask = () =>{
        dispatch(togglePin(selectedTask));
        dispatch(setSelectedTask(null));
    }
    const handleEditTask = () =>{
        setShowEditTask(selectedTask);
    }
    return ( 
        <div className={`${styles.tasks} ${isMaximized ? styles['extended-tasks'] : ''}`}>
            
            {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
            {showEditTask ? <EditTask closeEditTask={()=>setShowEditTask(false)} taskId={showEditTask} /> : null}
  
            <div className={`${styles.header} `}>
                <select className={styles.category} onChange={(e)=>changeCategory(e.target.value)} value={selectedCategory}> 
                    <option value={'all'}>All</option>
                    <option value={'not-completed'}>Not Completed</option>
                    <option value={'pinned'}>Pinned</option>
                    <option value={'completed'}>Completed</option>
                    <option value={'deleted'}>Deleted</option>
                </select>      
                {selectedTask && selectedCategory !== 'deleted' ? (
                    <div className={styles['task-buttons']}>
                        <button onClick={handleEditTask}><img className='small-icon' src={IconLibrary.Edit} alt='edit selected task'></img></button>
                        <button onClick={handlePinTask}><img className='small-icon' src={tasks.some(item=>item.id === selectedTask && item.isPinned) ? IconLibrary.Unpin : IconLibrary.Pin} alt='pin selected task'></img></button>
                        <button onClick={handleDeleteTask}><img className='small-icon' src={IconLibrary.Delete} alt='delete selected task'></img></button>
                    </div>
                ) : 
                selectedTask && selectedCategory === 'deleted' ? (
                    <div className={styles['task-buttons']}>
                        <button onClick={handleRestoreTask}><img className='small-icon' src={IconLibrary.Restore} alt='Restore selected deleted task'></img></button>
                    </div>
                 ) : null}
                <button onClick={()=>setShowNewTask(true)}>
                    <img className='small-icon' src={IconLibrary.Plus} alt='open new project'></img>
                </button>
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