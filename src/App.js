import './App.css';
import FullScreenModal from './components/common/FullScreenModal/FullScreenModal';
import MainPanel from './components/MainPanel/MainPanel';
import Pomodoro from './components/Pomodoro/Pomodoro';
import SideMenu from './components/SideMenu/SideMenu';
import { useEffect, useState } from 'react';

function App() {

  const [showFullscreenModal, setShowFullscreenModal] = useState(true);

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
  
  



  return (
    <div className="App">
      {showFullscreenModal ? <FullScreenModal closeModal={()=>setShowFullscreenModal(false)} /> : null}
      <SideMenu />
      <MainPanel />
      <Pomodoro />
    </div>
  );
}

export default App;
