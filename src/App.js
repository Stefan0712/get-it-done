import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro';
import SideMenu from './components/SideMenu/SideMenu';
import Tasks from './components/Tasks/Tasks';
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
      <Tasks />
      <Pomodoro />
    </div>
  );
}

export default App;
