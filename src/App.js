import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro';
import SideMenu from './components/SideMenu/SideMenu';
import Tasks from './components/Tasks/Tasks';

function App() {

  



  return (
    <div className="App">
      <SideMenu />
      <Tasks />
      <Pomodoro />
    </div>
  );
}

export default App;
