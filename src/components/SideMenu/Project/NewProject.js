import { IconLibrary } from '../../../IconLibrary';
import styles from './Project.module.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewProject = ({closeForm}) => {

    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#171717');


    const handleNewProject = () =>{
        let data = {id: uuidv4(), title, color};
        console.log(data);
    }

    return ( 
        <div className={styles['new-project']}>
            <div className={styles.header}>
                <h2>New Project</h2>
                <button onClick={closeForm}><img src={IconLibrary.Close} alt='close new project'></img></button>
            </div>
            <fieldset>
                <label>Title</label>
                <input type='text' name='title' onChange={(e)=>setTitle(e.target.value)} value={title} required></input>
            </fieldset>
            <fieldset>
                <label>Color</label>
                <input id={styles['color-input']} type='color' name='color' onChange={(e)=>setColor(e.target.value)} value={color} required></input>
            </fieldset>
            <button type='button' onClick={handleNewProject}>Save</button>
        </div>
     );
}
 
export default NewProject;