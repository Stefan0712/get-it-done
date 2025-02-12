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


    const handleNewTask = () =>{
        const taskId = uuidv4();
        dispatch(addTask({id: taskId,title, color}));
        dispatch(addTaskToProject({projectId: selectedProject, taskId}));
        closeNewTask();
    }


    return ( 
        <div className={styles['new-task']}>
            <div className={styles.header}>
                <h3>New Task</h3>
                <button onClick={closeNewTask}><img src={IconLibrary.Close} alt='close new task'></img></button>
            </div>
            <fieldset>
                <label>Title</label>
                <input type='text' name='title' onChange={(e)=>setTitle(e.target.value)} value={title} required></input>
            </fieldset>
            <fieldset>
                <label>Color</label>
                <input id={styles['color-input']} type='color' name='color' onChange={(e)=>setColor(e.target.value)} value={color} required></input>
            </fieldset>
            <button type='button' onClick={handleNewTask}>Save</button>
        </div>
     );
}
 
export default NewTask;