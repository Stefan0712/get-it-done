import { getTextColor } from '../../../helpers';
import { setSelectedProject } from '../../../store/appSettingsSlice';
import styles from './Workboard.module.css';
import { useSelector, useDispatch } from 'react-redux';


const Workboard = ({isExpanded}) => {

    const dispatch = useDispatch();

    const projects = useSelector(state=>state.projects);
    const selectedProject = useSelector(state=>state.appSettings.selectedProject);
    const handleSelectProject = (id) =>{
        dispatch(setSelectedProject(id))
    } 
    return ( 
        <div className={`${styles.workboard}`}>
            {projects && projects.length > 0 ? projects.map((project,index)=>(
                <div key={'project-'+index} className={`${styles.item} ${selectedProject === project.id ? styles.selected : ''}`} style={{backgroundColor: project.color}} onClick={()=>handleSelectProject(project.id)}>
                    {isExpanded ? <h4 style={{color: getTextColor(project.color)}}>{project.title}</h4> : null}
                    <p style={{color: getTextColor(project.color)}}>{project.tasks.length}</p>
                </div>
            )): null}
            
        </div>
     );
}
 
export default Workboard;