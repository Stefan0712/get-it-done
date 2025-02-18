import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import Habit from './Habit';


const Home = () => {

    const tasks = useSelector((state)=>state.tasks.tasks);
    const [currentTime, setCurrentTime] = useState(new Date());
    const date = new Date();
    const todayDate = date.toISOString().split("T")[0];

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); 
    
        return () => clearInterval(interval);
    }, []);

    const dueTasks = tasks?.filter(item=>item.dueDate === todayDate) || [];

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
            <div className={styles.tasks}>
                <h4>Due Today</h4>
                <div className={styles['tasks-container']}>
                    {dueTasks && dueTasks.length > 0 ? dueTasks.map((task, index)=>(
                        <div key={index} className={styles['home-task']}>
                            <p className={styles['task-title']}>{task.title}</p>
                            {task.priority ? <div className={styles.color} style={{backgroundColor: task.priority === 'high' ? 'red' : task.priority === 'normal' ? 'green' : task.priority === 'low' ? 'blue' : 'transparent'}}></div> : null}
                        </div>  
                    )) : <p className={styles['no-tasks-message']}>There are no tasks due today.</p>}
                </div>
            </div>
                
            <Habit />
        </div>
     );
}
 
export default Home;