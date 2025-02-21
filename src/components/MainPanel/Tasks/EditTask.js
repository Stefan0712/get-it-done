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
    const todayRawDate = new Date();
    const todayDate = todayRawDate.toISOString().split("T")[0];
    const [dueDate, setDueDate] = useState(taskData.dueDate || todayDate);
    const [dueHour, setDueHour] = useState(taskData.dueHour || "00:00");
    const [isPinned, setIsPinned] = useState(taskData.isPinned || false);

    const handleUpdateTask = () =>{
        dispatch(updateTask({id: taskId, title, priority, dueDate, dueHour, isPinned}));
        closeEditTask();
    }


    return ( 
        <div className={styles['new-task']}>
            <div className={styles['new-task-header']}>
                <h3>New Task</h3>
                <button onClick={closeEditTask}><img src={IconLibrary.Close} alt='close new task'></img></button>
            </div>
            <div className={styles['same-line-top']}>
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
            </div>
            <div className={styles['same-line-bottom']}>
                <fieldset>
                    <label>Due Date</label>
                    <input id={styles['due-date-input']} type='date' name='dueDate' onChange={(e)=>setDueDate(e.target.value)} value={dueDate}></input>
                </fieldset>
                <fieldset>
                    <label>Due Hour</label>
                    <input id={styles['due-hour-input']} type='time' name='dueHour' onChange={(e)=>setDueHour(e.target.value)} value={dueHour}></input>
                </fieldset>
            </div>
            <button className={styles['save-button']} type='button' onClick={handleUpdateTask}>Save</button>
        </div>
     );
}
 
export default EditTask;