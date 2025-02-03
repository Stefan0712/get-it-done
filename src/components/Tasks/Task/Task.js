import { toggleTaskCompletion } from '../../../store/tasksSlice';
import styles from '../Tasks.module.css';
import { useDispatch } from 'react-redux';

const Task = ({data, isSelected, selectTask}) => {

    const dispatch = useDispatch();

    const handleCheckTask = ()=>{
        dispatch(toggleTaskCompletion(data.id))
    }

    return ( 
        <div className={`${styles.task} ${isSelected ? styles.selected : ''}`} onClick={()=>selectTask(data.id)}>
            <h4>{data.title}</h4>
            <input type='checkbox' onChange={handleCheckTask} checked={data.isCompleted}></input>
        </div>
     );
}
 
export default Task;