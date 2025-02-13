import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import Habbit from './Habbit';


const Home = () => {

    const projects = useSelector((state)=>state.projects);
    const tasks = useSelector((state)=>state.tasks.tasks);
    const pinnedTasks = useSelector((state)=>state.tasks.tasks.filter(item=>item.isPinned))

    const [currentTime, setCurrentTime] = useState(new Date());
    const date = new Date();
    const todayDate = date.toISOString().split("T")[0];

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
                <div className={styles['current-time']}>
                    <div className={styles.date}>
                        <div className={styles['day-of-week']}>{dayOfWeek}</div>
                        <div className={styles['date']}>{formattedDate}</div>
                    </div>
                    <div className={styles['time']}>{formattedTime}</div>
                </div>

            </div>
            <div className={styles.pinned}>
                <h4>Due Today</h4>
                <div className={styles['pinned-tasks-container']}>
                    {pinnedTasks && pinnedTasks.length > 0 ? pinnedTasks.map((task, index)=>(
                        <div className={styles['home-task']}>
                            <p className={styles['task-title']}>{task.title}</p>
                            {task.dueDate ? <p className={styles['task-dueDate']}>{task.dueDate}</p> : null}
                        </div>  
                    )) : null}
                </div>
            </div>
                
            <Habbit />
        </div>
     );
}
 
export default Home;