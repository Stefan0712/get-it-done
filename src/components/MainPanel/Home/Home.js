import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import Habit from './Habit';
import Summary from './Summary';
import WorkHistory from './WorkHistory';
import { useSelector } from 'react-redux';


const Home = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const settings = useSelector(state=>state.appSettings)

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); 
    
        return () => clearInterval(interval);
    }, []);


    // Format date and time
    const formattedTime = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const formattedDate = currentTime.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long" });

    return ( 
        <div className={styles.home}>
            <div className={styles.top}>
                <div className={styles['current-time']}>
                    <div className={styles.date}>
                        <div className={styles['day-of-week']}>{dayOfWeek}</div>
                        <div className={styles['date']}>{formattedDate}</div>
                    </div>
                    <div className={styles['time']}>{formattedTime}</div>
                </div>
            </div>  
            <div className={styles['warning-message']}>
                <h3>Please open Developer Tools and enable Device Emulation for a mobile phone. This app doesn't have a desktop layout yet since it's made only for mobile phones.</h3>
            </div>
            {settings.showTasksHistory ? (<Habit />) : null}
            {settings.showTasksSummary ? (<Summary />) : null}
            {settings.showWorkHistory ? (<WorkHistory />) : null}
        </div>
     );
}
 
export default Home;