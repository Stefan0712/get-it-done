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
    const handleSettingUpdate = (settingKey) =>{
        if(settings[settingKey]){
            dispatch(updateSetting({ settingKey, value: false }))
        }else if(!settings[settingKey]){
            dispatch(updateSetting({ settingKey, value: true }))
        }
    }
    return ( 
        <div className={`${styles.settings} ${settings.isPomodoroMinimized ? styles['extended-settings'] : ''}`}>
            <div className={styles.container}>
                <div className={styles.setting}>
                    <h3>Fullscreen</h3>
                    <div className={styles['setting-buttons']}>
                        <Toggle isActive={settings.isFullscreen} functionToRun={settings.isFullscreen ? exitFullScreen : enterFullScreen} />
                    </div>
                </div>
                <div className={styles.setting}>
                    <h3>Keep Screen Awake</h3>
                    <Toggle isActive={settings.isScreenAwakeOn} functionToRun={settings.isScreenAwakeOn ? toggleScreenAwakeOff : toggleScreenAwakeOn} />  
                </div>
                <div className={styles.setting}>
                    <h3>Swap Panels</h3>
                    <Toggle isActive={settings.isSwapped} functionToRun={()=>handleSettingUpdate('isSwapped')} />  
                </div>
                
                <div className={styles.setting}>
                    <h3>Show Fullscreen Promp on start</h3>
                    <Toggle isActive={settings.showFullScreenPrompt} functionToRun={()=>handleSettingUpdate('showFullScreenPrompt')} />
                    
                </div>
                <div className={styles.setting}>
                    <h3>Show Fullscreen Button</h3>
                    <Toggle isActive={settings.showFullscreenButton} functionToRun={()=>handleSettingUpdate('showFullscreenButton')} />
                    
                    
                </div>
                <div className={styles.setting}>
                    <h3>Notifications</h3>
                    <Toggle isActive={settings.showNotifications} functionToRun={()=>handleSettingUpdate('showNotifications')} />
                </div>
                <div className={styles.setting}>
                    <h3>Show Maximize Panel Button</h3>
                    <Toggle isActive={settings.showMaximizeButton} functionToRun={()=>handleSettingUpdate('showMaximizeButton')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Show History Button</h3>
                    <Toggle isActive={settings.showHistoryButton} functionToRun={()=>handleSettingUpdate('showHistoryButton')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Show Home Button</h3>
                    <Toggle isActive={settings.showHomeButton} functionToRun={()=>handleSettingUpdate('showHomeButton')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Show About Button</h3>
                    <Toggle isActive={settings.showAboutPage} functionToRun={()=>handleSettingUpdate('showAboutPage')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Show Tasks History</h3>
                    <Toggle isActive={settings.showTasksHistory} functionToRun={()=>handleSettingUpdate('showTasksHistory')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Show Tasks Summary</h3>
                    <Toggle isActive={settings.showTasksSummary} functionToRun={()=>handleSettingUpdate('showTasksSummary')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Show Work History</h3>
                    <Toggle isActive={settings.showWorkHistory} functionToRun={()=>handleSettingUpdate('showWorkHistory')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Force Landscape Mode</h3>
                    <Toggle isActive={settings.forceLandspace} functionToRun={()=>handleSettingUpdate('forceLandspace')} />  
                </div>
                <div className={styles.setting}>
                    <h3>Force Portrait Mode</h3>
                    <Toggle isActive={settings.forcePortrait} functionToRun={()=>handleSettingUpdate('forcePortrait')} />  
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