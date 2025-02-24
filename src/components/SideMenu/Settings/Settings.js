import styles from './Settings.module.css';
import { enterFullScreen, exitFullScreen } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { resetTasks } from '../../../store/tasksSlice';
import { resetAppSettings, toggleScreenAwake, updateSetting } from '../../../store/appSettingsSlice';
import Toggle from '../../common/Toggle';
import { IconLibrary } from '../../../IconLibrary';


const Settings = () => {

    const dispatch = useDispatch();
    
    const settings = useSelector((state)=>state.appSettings);



    const handleResetAll = () =>{
        dispatch(resetTasks());
        dispatch(resetAppSettings());
    }
    const toggleScreenAwakeOn = () =>{
        dispatch(toggleScreenAwake(true))

    }
    const toggleScreenAwakeOff = () =>{
        dispatch(toggleScreenAwake(false))
    }
    return ( 
        <div className={`${styles.settings} ${settings.isPomodoroMinimized ? styles['extended-settings'] : ''}`}>
            <div className={styles.container}>
                <div className={styles.setting}>
                    <h3>Fullscreen</h3>
                    <div className={styles['setting-buttons']}>
                        <Toggle isActive={settings.isScreenAwakeOn} functionToRun={settings.isFullscreen ? exitFullScreen : enterFullScreen} />
                    </div>
                </div>
                <div className={styles.setting}>
                    <h3>Keep Screen Awake</h3>
                    <Toggle isActive={settings.isScreenAwakeOn} functionToRun={settings.isScreenAwakeOn ? toggleScreenAwakeOff : toggleScreenAwakeOn} />  
                </div>
                <div className={styles.setting}>
                    <h3>Swap Panels</h3>
                    <Toggle isActive={settings.isSwapped} functionToRun={settings.isSwapped ? ()=>dispatch(updateSetting({ settingKey: 'isSwapped', value: false })) : ()=>dispatch(updateSetting({ settingKey: 'isSwapped', value: true }))} />  
                </div>
                
                <div className={styles.setting}>
                    <h3>Show Fullscreen Promp on start</h3>
                    <Toggle isActive={settings.showFullScreenPrompt} functionToRun={settings.showFullScreenPrompt ? ()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: false })) : ()=>dispatch(updateSetting({ settingKey: 'showFullScreenPrompt', value: true }))} />
                    
                </div>
                <div className={styles.setting}>
                    <h3>Show Fullscreen Button</h3>
                    <Toggle isActive={settings.showFullscreenButton} functionToRun={settings.showFullscreenButton ? ()=>dispatch(updateSetting({ settingKey: 'showFullscreenButton', value: false })) : ()=>dispatch(updateSetting({ settingKey: 'showFullscreenButton', value: true }))} />
                    
                    
                </div>
                <div className={styles.setting}>
                    <h3>Notifications</h3>
                    <Toggle isActive={settings.showNotifications} functionToRun={settings.showNotifications ? ()=>dispatch(updateSetting({ settingKey: 'showNotifications', value: false })) : ()=>dispatch(updateSetting({ settingKey: 'showNotifications', value: true }))} />
                </div>
                <h3>Reset Items</h3>
                <div className={styles.setting}>
                    <button onClick={()=>dispatch(resetAppSettings())}>Settings</button>
                </div>
                <div className={styles.setting}>
                    <button onClick={()=>dispatch(resetTasks())}>Tasks</button>
                </div>
                <div className={styles.setting}>
                    <button onClick={handleResetAll}>All</button>
                </div>
                <h3>Themes</h3>
                <div className={styles.setting}>
                    <button className={styles['theme-button']} onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'dark-theme' }))}><p>Dark</p>{settings.theme === 'dark-theme' ? <img className='small-icon' src={IconLibrary.Checkmark} alt='selected theme' /> : null}</button>
                </div>
                <div className={styles.setting}>
                    <button className={styles['theme-button']} onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'light-theme' }))}><p>Light</p>{settings.theme === 'light-theme' ? <img className='small-icon' src={IconLibrary.Checkmark} alt='selected theme' /> : null}</button>
                </div>
                <div className={styles.setting}>
                    <button className={styles['theme-button']} onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'amoled-theme' }))}><p>AMOLED</p>{settings.theme === 'amoled-theme' ? <img className='small-icon' src={IconLibrary.Checkmark} alt='selected theme' /> : null}</button>
                </div>
                <div className={styles.setting}>
                    <button className={styles['theme-button']} onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'sakura-theme' }))}><p>Sakura</p>{settings.theme === 'sakura-theme' ? <img className='small-icon' src={IconLibrary.Checkmark} alt='selected theme' /> : null}</button>
                </div>
                <div className={styles.setting}>
                    <button className={styles['theme-button']} onClick={()=>dispatch(updateSetting({ settingKey: 'theme', value: 'miku-theme' }))}><p>Miku</p>{settings.theme === 'miku-theme' ? <img className='small-icon' src={IconLibrary.Checkmark} alt='selected theme' /> : null}</button>
                </div>
            </div>
            
        </div>
     );
}
 
export default Settings;