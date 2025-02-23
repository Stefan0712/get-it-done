import { useState } from "react";
import styles from './Tasks.module.css';
import { IconLibrary } from "../../../IconLibrary";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../store/tasksSlice";


const EditTask = ({closeEditTask, taskId}) => {

    const dispatch = useDispatch();
    const taskData = useSelector(state=>state.tasks.tasks)?.find(item=>item.id===taskId);

    const [title, setTitle] = useState(taskData.title || '');
    const [priority, setPriority] = useState(taskData.priority || 'normal');

    const handleUpdateTask = () =>{
        dispatch(updateTask({id: taskId, title, priority }));
        closeEditTask();
    }


    return ( 
        <div className={styles['new-task']}>
            <div className={styles['new-task-header']}>
                <h3>New Task</h3>
                <button onClick={closeEditTask}><img className="medium-icon" src={IconLibrary.Close} alt='close new task'></img></button>
            </div>
            <fieldset>
                <label>Title</label>
                <input id={styles['title-input']} type='text' name='title' onChange={(e)=>setTitle(e.target.value)} value={title} required></input>
            </fieldset>
            <fieldset>
                <label>Priority</label>
                <select id={styles['priority-input']} type='priority' name='priority' onChange={(e)=>setPriority(e.target.value)} value={priority} required>
                    <option value={'low'}>Low</option>
                    <option value={'normal'}>Normal</option>
                    <option value={'high'}>High</option>
                </select>
            </fieldset>
           
            <button className={styles['save-button']} type='button' onClick={handleUpdateTask}>Save</button>
        </div>
     );
}
 
export default EditTask;