import { setSelectedTask } from '../../../store/appSettingsSlice';
import { toggleTaskCompletion } from '../../../store/tasksSlice';
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
        <div className={`${styles.task} ${isSelected || selectedTask === data.id ? styles.selected : ''}`} onClick={handleSelectTask}>
            <h4>{data.title}</h4>
            <input type='checkbox' onChange={handleCheckTask} checked={data.isCompleted}></input>
        </div>
     );
}
 
export default Task;