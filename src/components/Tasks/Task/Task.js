import styles from '../Tasks.module.css';

const Task = ({data}) => {
    return ( 
        <div className={styles.task}>
            <h3>{data.title}</h3>
            <input type='checkbox' checked={data.isCompleted}></input>
        </div>
     );
}
 
export default Task;