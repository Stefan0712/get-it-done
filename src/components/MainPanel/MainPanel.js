import styles from './MainPanel.module.css';
import { useState } from 'react';
import Home from './Home/Home';
import Tasks from './Tasks/Tasks';
import History from './History/History';
import Settings from '../SideMenu/Settings/Settings';
import { useSelector } from 'react-redux';
import { enterFullScreen, exitFullScreen, isFullscreen } from '../../helpers';
import { IconLibrary } from '../../IconLibrary';


const MainPanel = () => {
    const [selectedScreen, setSelectedScreen] = useState('home');
    const isMinimized = useSelector(state=>state.appSettings.isPomodoroMinimized);
    const settings = useSelector((state)=>state.appSettings);
    const [isPanelExpanded, setIsPanelExpanded] = useState(false);


    return ( 
        <div className={`${styles.mainPanel} ${isMinimized ? styles['extended'] : ''} ${isPanelExpanded ? styles['hide-nav'] : ''}`}>
            <div className={`${styles.navigation} ${isPanelExpanded ? styles.hide : ''}`}>
                {settings.showFullscreenButton && window.innerWidth < 1000  ? <button className={styles['fullscreen-button']} onClick={isFullscreen() ? exitFullScreen : enterFullScreen} >
                    <img className='small-icon' src={isFullscreen() ? IconLibrary.DisableFullscreen : IconLibrary.EnableFullscreen} alt='enable fullscreen' /></button> : null}
                <div className={styles.buttons}>
                    <button onClick={()=>setSelectedScreen('home')} className={selectedScreen === "home" ? styles.selected : ''}>Home</button>
                    <button onClick={()=>setSelectedScreen('tasks')} className={selectedScreen === "tasks" ? styles.selected : ''}>Tasks</button>
                    <button onClick={()=>setSelectedScreen('history')} className={selectedScreen === "history" ? styles.selected : ''}>History</button>
                    <button onClick={()=>setSelectedScreen('settings')} className={selectedScreen === "settings" ? styles.selected : ''}>Settings</button>
                </div>
                    <button className={styles['maximize-panel-button']} onClick={()=>setIsPanelExpanded(true)}>
                        <img className='small-icon' src={IconLibrary.Maximize} alt='toggle panel maximize'></img>
                    </button> 
            </div>
            <div className={styles.content}>
                    {isPanelExpanded ? 
                        <button className={styles['minimize-panel-button']} onClick={()=>setIsPanelExpanded(false)}>
                            <img className='small-icon' src={IconLibrary.Minimize} alt='minimize panel'></img>
                        </button> 
                    : null} 
                {selectedScreen === 'home' ? <Home /> : selectedScreen === "tasks" ? <Tasks /> : selectedScreen === "history" ? <History /> : selectedScreen === "settings" ? <Settings /> : <Home />}
            </div>
        </div>
     );
}
 
export default MainPanel;