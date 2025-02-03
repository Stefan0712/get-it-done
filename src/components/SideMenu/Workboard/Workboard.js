import styles from './Workboard.module.css';


const Workboard = ({isExpanded}) => {
    return ( 
        <div className={`${styles.workboard}`}>
            <div className={styles.item}>
                {isExpanded ? <h4>Project 1</h4> : null}
                <p>4</p>
            </div>
            <div className={styles.item}>
                {isExpanded ? <h4>Project 2</h4> : null}
                <p>12</p>
            </div>
            <div className={styles.item}>
                {isExpanded ? <h4>Project 3</h4> : null}
                <p>7</p>
            </div>
        </div>
     );
}
 
export default Workboard;