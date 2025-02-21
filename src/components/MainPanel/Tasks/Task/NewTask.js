import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from '../Tasks.module.css';
import { IconLibrary } from "../../../../IconLibrary";
import { useDispatch } from "react-redux";
import { addTask } from "../../../../store/tasksSlice";


const NewTask = ({closeNewTask}) => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('normal');
    const todayRawDate = new Date();
    const todayDate = todayRawDate.toISOString().split("T")[0];
    const [dueDate, setDueDate] = useState(todayDate);
    const [dueHour, setDueHour] = useState("00:00");
    const [isPinned, setIsPinned] = useState(false);

    const handleNewTask = () =>{
        const taskId = uuidv4();
        dispatch(addTask({id: taskId, title, priority, dueDate, dueHour, isPinned}));
        closeNewTask();
    }


    return ( 
        <div className={styles['new-task']}>
            <div className={styles['new-task-header']}>
                <h3>New Task</h3>
                <button onClick={closeNewTask}><img className='medium-icon' src={IconLibrary.Close} alt='close new task'></img></button>
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
            <button className={styles['save-button']} type='button' onClick={handleNewTask}>Save</button>
        </div>
     );
}
 
export default NewTask;