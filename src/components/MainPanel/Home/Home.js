import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import Habit from './Habit';
import Summary from './Summary';
import WorkHistory from './WorkHistory';


const Home = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

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
            <Habit />
            <Summary />
            <WorkHistory />
        </div>
     );
}
 
export default Home;