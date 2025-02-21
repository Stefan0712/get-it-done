import { useState, useEffect } from 'react';

import { IconLibrary } from '../../../IconLibrary';

import NewTask from './Task/NewTask';
import styles from './Tasks.module.css';
import Task from './Task/Task';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTask, togglePin } from '../../../store/tasksSlice';
import { setSelectedTask, updateSetting } from '../../../store/appSettingsSlice';

import EditTask from './EditTask';



const Tasks = () => {

    const dispatch = useDispatch();


    const tasks = useSelector(state=>state.tasks.tasks)
    const selectedTask = useSelector(state=>state.appSettings.selectedTask);

    const isTasksMaximized = useSelector(state=>state.appSettings.isTasksMaximized);
    const isMaximized = useSelector(state=>state.appSettings.isPomodoroMinimized);

    const [showNewTask, setShowNewTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]); 

    const [selectedCategory, setSelectedCategory] = useState('all');


    //categorize tasks by completed, not completed, and pinned
    const completedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isCompleted && !item.isPinned) : [];
    const notCompletedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>!item.isCompleted && !item.isPinned) : [];
    const pinnedTasks = filteredTasks && filteredTasks.length > 0 ? filteredTasks.filter(item=>item.isPinned) : [];



    useEffect(() => {
        dispatch(setSelectedTask(null));

        if (!tasks || tasks.length === 0) {
            console.log('No tasks available');
            return;
        }else{
            // Sort tasks: pinned first, then not completed, then completed
            const sortedTasks = tasks?.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;  // Pinned first
                if (!a.isPinned && b.isPinned) return 1;
                if (!a.isCompleted && b.isCompleted) return -1;  // Not completed before completed
                if (a.isCompleted && !b.isCompleted) return 1;
                return 0;
            });
            setFilteredTasks(sortedTasks);
        }
        
    
        
    }, [tasks]);
    


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
            <div className={`${styles.tasks} ${isMaximized ? styles['extended-tasks'] : ''} ${isTasksMaximized ? styles['maximized-tasks'] : ''}`}>
                
                {showNewTask ? <NewTask closeNewTask={()=>setShowNewTask(false)} /> : null}
                {showEditTask ? <EditTask closeEditTask={()=>setShowEditTask(false)} taskId={showEditTask} /> : null}
                <div className={styles.filters}>
                    <div className={styles['filters-container']}>
                        <button className={`${styles['filter-button']} ${selectedCategory === "all" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('all')}>All</button>
                        <button className={`${styles['filter-button']} ${selectedCategory === "not-completed" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('not-completed')}>Not Completed</button>
                        <button className={`${styles['filter-button']} ${selectedCategory === "pinned" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('pinned')}>Pinned</button>
                        <button className={`${styles['filter-button']} ${selectedCategory === "completed" ? styles['selected-category'] : ''}`} onClick={()=>setSelectedCategory('completed')}>Completed</button>
                    </div>
                    <button className={styles['maximize-tasks-button']} onClick={()=>dispatch(updateSetting({ settingKey: 'isTasksMaximized', value: true }))}>
                        <img className='medium-icon' src={IconLibrary.Maximize} alt='toggle tasks maximize'></img>
                    </button>
                </div>
                <div className={styles.header}>
                    <p>Tasks: {selectedCategory === 'all' ? filteredTasks.length : selectedCategory === 'not-completed' ? notCompletedTasks.length : selectedCategory === "completed" ? completedTasks.length : selectedCategory === "pinned" ? pinnedTasks.length : null}</p>
                    {selectedTask ? (
                        <div className={styles['task-buttons']}>
                            <button onClick={handleEditTask}><img src={IconLibrary.Edit} alt='edit selected task'></img></button>
                            <button onClick={handlePinTask}><img src={pinnedTasks.some(item=>item.id === selectedTask) ? IconLibrary.Unpin : IconLibrary.Pin} alt='pin selected task'></img></button>
                            <button onClick={handleDeleteTask}><img src={IconLibrary.Delete} alt='delete selected task'></img></button>
                        </div>
                    ) : null}
                    <button onClick={()=>setShowNewTask(true)}><img src={IconLibrary.Plus} alt='open new project'></img></button>
                </div>
                <div className={styles.container}>
                    {selectedCategory === 'all' ? (
                    <>
                        {filteredTasks && filteredTasks.length > 0 ? 
                            filteredTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                         : null}
                    </>
                    ) 
                    : null}
                    {selectedCategory === 'completed' ? (
                        <>
                            {completedTasks && completedTasks.length > 0 ? 
                                completedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                            : null}
                        </>
                        ) 
                    : null}
                    {selectedCategory === 'not-completed' ? (
                        <>
                            {notCompletedTasks && notCompletedTasks.length > 0 ? 
                                notCompletedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                            : null}
                        </>
                        ) 
                    : null}
                    {selectedCategory === 'pinned' ? (
                        <>
                            {pinnedTasks && pinnedTasks.length > 0 ? 
                                pinnedTasks?.map((task, index)=>(<Task data={task} key={index} isSelected={task.id === selectedTask} selectTask={handleSelectTask}  />))
                            : null}
                        </>
                        ) 
                    : null}   
                </div>
               
            </div>
         );
   
}
 
export default Tasks;