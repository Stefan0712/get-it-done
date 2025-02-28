import styles from './About.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { useState } from 'react';
import Tutorial from '../../Tutorial/Tutorial.js';


const About = () => {

    const [showTutorial, setShowTutorial] = useState(false);
    return ( 
        <div className={styles.about}>
            {showTutorial ? <Tutorial closeTutorial={()=>setShowTutorial(false)} /> : null}
            <button className={styles['github-button']} onClick={()=>setShowTutorial(true)}>Tutorial</button>
            <div className={styles.section}>
                <h4>About this app</h4>
                <p>This app is a personal projects that I made for myself to help me eliminate the unnecessary long process of setting up my tasks.</p>
                <p>The flow that I use with this app is to add the tasks I want to do in this work session, start the pomodoro timer, and just check the tasks that are done.</p>
                <p>No need to other info except the task name itself, no advanced tags, groups, or other time consuming features, just add it, do it, check it off the list. Rinse and repeat.</p>
            </div>
            <div className={styles.section}>
                <h4>Issues and Contact</h4>
                <p>For any issues, question, or suggestions please contact me at email@gmail.com</p>
            </div>
            <div className={styles.section}>
                <h4>Donate</h4>
                <p>This app doesn't require any subscription or payment, but if you still want to support me, then you can donate by pressing the next button</p>
                <a className={styles['github-button']} target='_blank' href='#'><img src={IconLibrary.Donate} alt='donate logo'></img> Donate</a>
            </div>
            <div className={styles.section}>
                <h4>Contribute</h4>
                <p>If you want to contribute or just submit issues, feel free to check the github repo</p>
                <a className={styles['github-button']} target='_blank' href='https://github.com/Stefan0712/get-it-done'><img src={IconLibrary.Github} alt='github logo'></img> Github</a>
            </div>
            <div className={styles.section}>
                <h4>Other links</h4>
                <p>If you want to learn more about me then you can check those links</p>
                <div className={styles['buttons-container']}>
                    <a className={styles['github-button']} target='_blank' href='#'><img src={IconLibrary.Website} alt='website link'></img> Portfolio</a>
                    <a className={styles['github-button']} target='_blank' href='#'><img src={IconLibrary.Tiktok} alt='tiktok logo'></img> TikTok</a>
                </div>
            </div>
        </div>
     );
}
 
export default About;