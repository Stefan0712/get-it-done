import './App.css';
import FullScreenModal from './components/common/FullScreenModal/FullScreenModal';
import MainPanel from './components/MainPanel/MainPanel';
import Pomodoro from './components/Pomodoro/Pomodoro';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFullscreen } from './store/appSettingsSlice';
import NoSleep from 'nosleep.js';


const noSleep = new NoSleep();

function App() {

  const [showFullscreenModal, setShowFullscreenModal] = useState(true);

  const settings = useSelector((state)=>state.appSettings);

  const dispatch = useDispatch();
  
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
          dispatch(toggleFullscreen(true))
      } else {
          dispatch(toggleFullscreen(false))
      }
    };
    

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
    
  }, []);

  useEffect(() => {
    document.documentElement.className = settings.theme;
    console.log('Theme was changed')
  }, [settings.theme]);

  useEffect(() => {
    if (settings.isScreenAwakeOn) {
        noSleep.enable();
    } else {
        noSleep.disable();
    }
  }, [settings.isScreenAwakeOn]);

  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/get-it-done/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed', err));
    }
  },[])
  return (
    <div className={`App ${settings.isSwapped ? 'swapped' : ''}`}>
      {showFullscreenModal && window.innerWidth < 1000 && settings.showFullScreenPrompt ? <FullScreenModal closeModal={()=>setShowFullscreenModal(false)} /> : null}
      <MainPanel />
      <Pomodoro />
    </div>
  );
}

export default App;
