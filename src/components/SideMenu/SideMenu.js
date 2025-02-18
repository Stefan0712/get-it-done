import { useSelector } from 'react-redux';
import { IconLibrary } from '../../IconLibrary';
import NewProject from './Project/NewProject';
import Settings from './Settings/Settings';
import styles from './SideMenu.module.css';
import Workboard from './Workboard/Workboard';
import { useState } from 'react';
import { enterFullScreen, exitFullScreen, isFullscreen } from '../../helpers';


const SideMenu = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showNewProject, setShowNewProject] = useState(false);

    const settings = useSelector((state)=>state.appSettings)


    const toggleSideMenu = () =>{
        if(isExpanded){
            setShowSettings(false);
            setIsExpanded(false);
            setShowNewProject(false);
        }else if(!isExpanded){
            setIsExpanded(true);
        }
    }
    return ( 
        <div className={`${styles.sideMenu} ${isExpanded ? styles.expand : ''}`}>
            {showSettings ? <Settings closeSettings={()=>setShowSettings(false)} /> : null}
            {showNewProject ? <NewProject closeForm={()=>setShowNewProject(false)} /> : null}
            {settings.showFullscreenButton && window.innerWidth < 1000  ? <button className={styles['fullscreen-button']} onClick={isFullscreen() ? exitFullScreen : enterFullScreen} ><img src={isFullscreen() ? IconLibrary.DisableFullscreen : IconLibrary.EnableFullscreen} alt='enable fullscreen' />{isExpanded ? isFullscreen() ? <p>Exit Fullscreen</p> : <p>Enter Fullscreen</p> : null}</button> : null}
            <Workboard isExpanded={isExpanded} showNewProject={()=>setShowNewProject(true)}/>
            <div className={styles.buttons}>
                <button className={styles['menu-button']} onClick={()=>setShowNewProject(true)}>
                    <img src={IconLibrary.Plus}></img>
                </button>
                <button className={styles['menu-button']} onClick={()=>setShowSettings(true)}>
                    <img src={IconLibrary.Settings}></img>
                </button>
                <button className={styles['toggle-button']} onClick={toggleSideMenu}>
                    <img src={isExpanded ? IconLibrary.ExpandLeft : IconLibrary.ExpandRight}></img>
                </button>
            </div>
        </div>
     );
}
 
export default SideMenu;