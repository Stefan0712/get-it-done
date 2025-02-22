import { IconLibrary } from '../../../../IconLibrary';
import { setSelectedTask } from '../../../../store/appSettingsSlice';
import { toggleTaskCompletion } from '../../../../store/tasksSlice';
import styles from '../Tasks.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Task = ({data, isSelected, selectTask}) => {

    const dispatch = useDispatch();
    const selectedTask = useSelector(state=>state.appSettings.selectedTask)

    const handleCheckTask = ()=>{
        dispatch(toggleTaskCompletion(data.id))
    }
    const handleSelectTask = () =>{
        selectTask(data.id);
        dispatch(setSelectedTask(data.id))
    }
    return ( 
        <div className={`${styles.task} ${isSelected && selectedTask === data.id ? styles.selected : ''}`} onClick={handleSelectTask}>
            <div className={styles.color} style={{backgroundColor: data.priority === 'high' ? 'red' : data.priority === 'normal' ? 'green' : data.priority === 'low' ? 'blue' : 'transparent'}}></div>
            <h4 style={data.isCompleted ? {textDecoration: 'line-through'} : null}>{data.title}</h4>
            {data.isPinned ? <img className={`${styles['task-pin-icon']}`} src={IconLibrary.Pin} alt=''/> : null}
            {data.isCompleted ? <button onClick={handleCheckTask}><img className='small-icon' src={IconLibrary.Checkmark} /></button> : <input type='checkbox' onChange={handleCheckTask} checked={data.isCompleted}></input>}
        </div>
     );
}
 
export default Task;