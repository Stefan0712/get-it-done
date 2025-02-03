import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from '../Tasks.module.css';
import { IconLibrary } from "../../../IconLibrary";


const NewTask = ({closeNewTask}) => {

    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#171717');


    const handleNewTask = () =>{
        let data = {id: uuidv4(), title, color};
        console.log(data);
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