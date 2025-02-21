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
    const setAppHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };
  
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
  
    return () => {
      window.removeEventListener('resize', setAppHeight);
    };
  }, []);
  
  
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
    if (settings.isScreenAwakeOn) {
        noSleep.enable();
    } else {
        noSleep.disable();
    }
  }, [settings.isScreenAwakeOn]);
  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").then(() => {
          console.log("Service Worker registered!");
      });
  }
  
  },[])
  return (
    <div className={`App ${settings.theme}`}>
      {showFullscreenModal && window.innerWidth < 1000 && settings.showFullScreenPrompt ? <FullScreenModal closeModal={()=>setShowFullscreenModal(false)} /> : null}
      <MainPanel />
      <Pomodoro />
    </div>
  );
}

export default App;
