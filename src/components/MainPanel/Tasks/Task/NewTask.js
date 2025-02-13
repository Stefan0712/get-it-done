import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from '../Tasks.module.css';
import { IconLibrary } from "../../../../IconLibrary";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../store/tasksSlice";
import { addTaskToProject } from "../../../../store/projectsSlice";


const NewTask = ({closeNewTask}) => {

    const dispatch = useDispatch();
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);

    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#444444');
    const todayRawDate = new Date();
    const todayDate = todayRawDate.toISOString().split("T")[0];
    const [dueDate, setDueDate] = useState(todayDate);
    const [dueHour, setDueHour] = useState("00:00");
    const [isPinned, setIsPinned] = useState(false);

    const handleNewTask = () =>{
        const taskId = uuidv4();
        dispatch(addTask({id: taskId, title, color, dueDate, dueHour, isPinned}));
        dispatch(addTaskToProject({projectId: selectedProject, taskId}));
        closeNewTask();
    }


    return ( 
        <div className={styles['new-task']}>
            <div className={styles['new-task-header']}>
                <h3>New Task</h3>
                <button onClick={closeNewTask}><img src={IconLibrary.Close} alt='close new task'></img></button>
            </div>
            <div className={styles['same-line-top']}>
                <fieldset>
                    <label>Title</label>
                    <input id={styles['title-input']} type='text' name='title' onChange={(e)=>setTitle(e.target.value)} value={title} required></input>
                </fieldset>
                <fieldset>
                    <label>Color</label>
                    <input id={styles['color-input']} type='color' name='color' onChange={(e)=>setColor(e.target.value)} value={color} required></input>
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
                <fieldset>
                    <label>Pin Task</label>
                    <select id={styles['pin-task-input']} name='pinTask' onChange={(e)=>setIsPinned(e.target.value)} value={isPinned}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    
                </fieldset>
            </div>
            <button type='button' onClick={handleNewTask}>Save</button>
        </div>
     );
}
 
export default NewTask;