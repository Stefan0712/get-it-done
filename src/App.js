import './App.css';
import MainPanel from './components/MainPanel/MainPanel';
import Pomodoro from './components/Pomodoro/Pomodoro';
import SideMenu from './components/SideMenu/SideMenu';
import { useEffect } from 'react';

function App() {


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
      <SideMenu />
      <MainPanel />
      <Pomodoro />
    </div>
  );
}

export default App;
