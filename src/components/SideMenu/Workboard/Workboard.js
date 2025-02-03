import styles from './Workboard.module.css';
import { useSelector } from 'react-redux';


const Workboard = ({isExpanded}) => {

    const projects = useSelector(state=>state.projects)

    return ( 
        <div className={`${styles.workboard}`}>
            {projects && projects.length > 0 ? projects.map((project,index)=>(
                <div key={'project-'+index} className={styles.item} style={{backgroundColor: project.color}}>
                    {isExpanded ? <h4>{project.title}</h4> : null}
                    <p>{project.tasks.length}</p>
                </div>
            )): null}
            
        </div>
     );
}
 
export default Workboard;