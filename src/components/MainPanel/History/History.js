import { formatDate } from '../../../helpers';
import styles from './History.module.css';
import { useSelector } from 'react-redux';


const History = () => {

    const history = useSelector((state)=>state.appSettings.history);
    console.log(history)


    const getHour = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    };
    const getDuration = (start, finish) =>{
        const startTime = new Date(start);
        const finishTime = new Date(finish);
        const durationMs = finishTime - startTime;
        
        const minutes = Math.floor((durationMs / 1000 / 60) % 60);
        const hours = Math.floor((durationMs / 1000 / 60 / 60));

        return `${hours}h ${minutes}m`;
    }
    return ( 
        <div className={styles.history}>
             {history && Object.keys(history).length > 0 ? (
                Object.keys(history)
                    .sort((a, b) => new Date(b) - new Date(a))
                    .map(date => (
                        <div className={styles['day-container']} key={date}>
                            <h4 className={styles.date}>{formatDate(date)}</h4> 
                            <div className={styles['day-entries']}>
                                {history[date]?.map((session, index) => (
                                    <div className={styles.entry} key={index}>
                                        <p className={styles.hour}>From {getHour(session.startTime)} to {getHour(session.finishTime)}</p>
                                        <p className={styles.duration}>{getDuration(session.startTime, session.finishTime)}</p>
                                        <p className={styles.sessions}>{session.focusSessions}/{session.breaks}/{session.longBreaks}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
            ) : (
                <p>No history available</p>
            )}
        </div>
    );
}
 
export default History;