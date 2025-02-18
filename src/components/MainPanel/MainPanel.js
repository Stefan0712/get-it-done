import styles from './MainPanel.module.css';
import { useState } from 'react';
import Home from './Home/Home';
import Tasks from './Tasks/Tasks';
import History from './History/History';
import Settings from '../SideMenu/Settings/Settings';

const MainPanel = () => {
    const [selectedScreen, setSelectedScreen] = useState('home');


    return ( 
        <div className={styles.mainPanel}>
            <div className={styles.navigation}>
                <button onClick={()=>setSelectedScreen('home')} className={selectedScreen === "home" ? styles.selected : ''}>Home</button>
                <button onClick={()=>setSelectedScreen('tasks')} className={selectedScreen === "tasks" ? styles.selected : ''}>Tasks</button>
                <button onClick={()=>setSelectedScreen('history')} className={selectedScreen === "history" ? styles.selected : ''}>History</button>
                <button onClick={()=>setSelectedScreen('settings')} className={selectedScreen === "settings" ? styles.selected : ''}>Settings</button>
            </div>
            <div className={styles.content}>
                {selectedScreen === 'home' ? <Home /> : selectedScreen === "tasks" ? <Tasks /> : selectedScreen === "history" ? <History /> : selectedScreen === "settings" ? <Settings /> : <Home />}
            </div>
        </div>
     );
}
 
export default MainPanel;