
import './App.css';
import { Calender } from './Components/Calender/Calender';
import Drawer from './Components/Drawer/Drawer';
import { TimeLine } from './Components/Timeline/Timeline';
import React from 'react';
import NewTimeline from './Components/NewTimeline/NewTimeline';
import NewTimelineYear from './Components/NewTimelineYear/NewTimelineYear';
function App() {
 
  return (
    <div  style={{width:"100%"}} >
      {/* <Drawer/> */}
      {/* <Calender/> */}
      {/* <TimeLine /> */}
      <NewTimeline />
      {/* <NewTimelineYear/> */}
    </div>
  );
}

export default App;
