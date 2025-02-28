import { IconLibrary } from '../../IconLibrary';
import { ImageLibrary } from './ImageLibrary';
import styles from './Tutorial.module.css';


const Tutorial = ({closeTutorial}) => {
    return ( 
        <div className={styles.tutorial}>
            <div className={styles.header}>
                <h1>Tutorial</h1>
                <button onClick={closeTutorial}><img src={IconLibrary.Close} alt='close tutorial' className='medium-icon'/></button>
            </div>
            <div className={styles.section}>
                <p>Hello and thank you for using my app. This tutorial will go through the features of this app. Let's start.</p>
                <h3>Features</h3>
                <p>The app is supposed to be clean and quick to use, keeping a minimal interface. You can:</p>
                <ul>
                    <li>Add, pin, edit, delete, and restore tasks</li>
                    <li>Set custom session length</li>
                    <li>See a history of your work sessions</li>
                    <li>Toggle elements you want to show/hide</li>
                    <li>Change themes</li>
                    <li>Always present Pomodoro Timer</li>
                    <li>Maximize tasks for a more clear ui</li>
                    <li>Keep screen awake</li>
                    <li>See summaries of your day</li>
                    <li>Reset all settings and tasks</li>
                </ul>
            </div>
            <h3>How to use the app</h3>
            <div className={styles.section}>
                <img className={styles['full-app-image']} src={ImageLibrary.FullTimer}></img>
            </div>
            <div className={styles.section}>
            <p>The app is always split between two panel: Main Panel and Pomodoro Timer</p>
                <ul>
                    <li>The minimize timer button will shrink the timer to a simpler and cleaner version taking up only a small portion of the screen</li>
                    <li>Pomodoro Settings will open all settings related to the timer</li>
                    <li>The 1/0/0 are the number of sessions from the current work session. The colored one represent the current session, that is also shown in the text above the counter</li>
                    <li>The reset button will reset the current session to the starting time (ex back to 25 minutes)</li>
                    <li>The skip button will skip to the next session, also increasing the counter by 1</li>
                    <li>The play buttin starts the timer and will change to a pause button. You can also start/pause the timer by pressing the time itself</li>
                    <li>The finish button will end the work session, reset everything and save it to history</li>
                    <li>The hide button will hide all bottom buttons. They can be shown again by pressing the arrow that will replace them</li>
                    <li>The outer border also represents the progress of the timer.</li>
                    <li>The hide navigation button will just hive the top buttons from the main panel</li>
                    <li>The toggel fullscreen button will switch the entire app into fullscreen mode</li>
                </ul>
            </div>
            <h4>Home page</h4>
            <div className={styles.section}>
                <img className={styles['full-app-image']} src={ImageLibrary.Home}></img>
            </div>
            <div className={styles.section}>
                <p>This is the default page of the main panel. It will show the current date and time live and three modules with summaries of the current day</p>
                <p>You can hide panel or the entire page from the settings</p>
            </div>
            <h4>Tasks</h4>
            <div className={styles.section}>
                <img className={styles['full-app-image']} src={ImageLibrary.Tasks}></img>
            </div>
            <div className={styles.section}>
            <p>All actions related to tasks are found in this page. You can create, edit, pin, and delete tasks.</p>
            <p>Touch the task to show the buttons related to that task. Touch the checkbox to complete it.</p>
            <p>The dropdown shows all categories. All tasks will show all categories except the deleted tasks.</p>
            <p>Deleted tasks can only be found in the <b>Deleted</b> category, from where you can restore them.</p>
            <p>You can only set the title and priority of the task. The priority will show a certain color that is always visible.</p>
            </div>
            <h4>History</h4>
            <div className={styles.section}>
                <img className={styles['full-app-image']} src={ImageLibrary.History}></img>
            </div>
            <div className={styles.section}>
                <p>A history of your work sessions can be found here, grouped by days.</p>
                <p>You can see the starting and finish time, the duration, and how many sessions you had in that work session</p>
            </div>
            <h4>Settings</h4>
            <div className={styles.section}>
            <p>Here, you can find all settings related to the main panel and the app.</p>
            <p>Explanation of each setting:</p>
            <ul>
                <li><strong>Fullscreen</strong> – Toggles fullscreen mode for the entire app.</li>
                <li><strong>Keep Screen Awake</strong> – Prevents your screen from turning off.</li>
                <li><strong>Swap Panels</strong> – Swaps the main panel with the timer.</li>
                <li><strong>Show Fullscreen Prompt on Start</strong> – Toggles the notification prompting you to enable fullscreen.</li>
                <li><strong>Show Fullscreen Button</strong> – Shows or hides the fullscreen button in the top-left of the main panel navigation.</li>
                <li><strong>Show Maximize Panel Button</strong> – Shows or hides the maximize button in the top-right of the main panel.</li>
                <li><strong>Show Home, About, and History Buttons</strong> – Toggles the visibility of these buttons in the main panel navigation.</li>
                <li><strong>Show Tasks History, Show Tasks Summary, and Show Work History</strong> – Toggles these modules on the home page.</li>
                <li><strong>Reset Items Buttons</strong> – Deletes all data related to the selected items. This action is irreversible.</li>
            </ul>
        </div>

        </div>
     );
}
 
export default Tutorial;