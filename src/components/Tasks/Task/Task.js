import { toggleTaskCompletion } from '../../../store/tasksSlice';
import styles from '../Tasks.module.css';
import { useDispatch } from 'react-redux';

const Task = ({data}) => {

    const dispatch = useDispatch();

    const handleCheckTask = ()=>{
        dispatch(toggleTaskCompletion(data.id))
    }

    return ( 
        <div className={styles.task}>
            <h3>{data.title}</h3>
            <input type='checkbox' onChange={handleCheckTask} checked={data.isCompleted}></input>
        </div>
     );
}
 
export default Task;