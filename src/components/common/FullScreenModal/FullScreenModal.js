import { IconLibrary } from "../../../IconLibrary";
import { enterFullScreen } from "../../../helpers";
import styles from './FullScreenModal.module.css';

const FullScreenModal = ({closeModal}) => {

    const handleEnterFullscreen = () =>{
        enterFullScreen();
        closeModal();
    }
    return ( 
        <div className={styles.modal}>
            <div className={styles.message}>Enable fullscreen for best experience?</div>
            <button onClick={handleEnterFullscreen}>Enable</button>
            <button className={styles['close-button']} onClick={closeModal}><img alt="close fullscreen modal" src={IconLibrary.Close} /></button>
        </div>
     );
}
 
export default FullScreenModal;

