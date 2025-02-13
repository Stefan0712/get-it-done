import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import Habbit from './Habbit';


const Home = () => {

    const projects = useSelector((state)=>state.projects)

    const [currentTime, setCurrentTime] = useState(new Date());
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Updates every second
    
        return () => clearInterval(interval);
    }, []);

    // Format date and time
    const formattedTime = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const formattedDate = currentTime.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long" });

    const getTotalNoOfTasks = () =>{
        let sum = 0;
        projects.forEach(project=>sum += project.tasks.length);
        return sum;
    }

    return ( 
        <div className={styles.home}>
            <div className={styles.top}>
                <div className={styles['day-of-week']}>{dayOfWeek}</div>
                <div className={styles['date']}>{formattedDate}</div>
                <div className={styles['time']}>{formattedTime}</div>
            </div>
            <div className={styles.middle}>
                <div className={styles.summaries}>
                    <div className={styles.summary}>
                        <h3>Projects</h3>
                        <p>{projects?.length}</p>
                    </div>
                    <div className={styles.summary}>
                        <h3>Tasks</h3>
                        <p>{getTotalNoOfTasks()}</p>
                    </div>
                </div>
                
            </div>
            <Habbit />
        </div>
     );
}
 
export default Home;