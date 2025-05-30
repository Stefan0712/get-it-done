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

    const handleNewTask = () =>{
        const taskId = uuidv4();
        dispatch(addTask({id: taskId, title, priority}));
        closeNewTask();
    }


    return ( 
        <div className={styles['new-task']}>
            <div className={styles['new-task-header']}>
                <h3>New Task</h3>
                <button onClick={closeNewTask}><img className='medium-icon' src={IconLibrary.Close} alt='close new task'></img></button>
            </div>
            <fieldset id={styles['title-input']}>
                <label>Title</label>
                <input  type='text' name='title' onChange={(e)=>setTitle(e.target.value)} value={title} required></input>
            </fieldset>
            <fieldset id={styles['priority-input']}>
                <label>Priority</label>
                <select type='priority' name='priority' onChange={(e)=>setPriority(e.target.value)} value={priority} required>
                    <option value={'low'}>Low</option>
                    <option value={'normal'}>Normal</option>
                    <option value={'high'}>High</option>
                </select>
            </fieldset>
            <button className={styles['save-button']} type='button' onClick={handleNewTask}>Save</button>
        </div>
     );
}
 
export default NewTask;