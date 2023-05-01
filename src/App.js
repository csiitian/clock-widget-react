import React, { useEffect, useState } from 'react';
import BreakTime from './BreakTime';
import SessionTime from './SessionTime';
import PomodoroTime from './PomodoroTime';
import './styles.css';
// import io from "socket.io-client";
import HandleKeyboardButton from './HandleKeyboardButton';

function App() {

  const [breakTime, setBreakTime] = useState(initialBreakTime());
  const [sessionTime, setSessionTime] = useState(initialSessionTime());
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [breakInProgress, setBreakInProgress] = useState(false);
  const [timeLeft, setTimeLeft] = useState(breakInProgress ? breakTime * 60 : sessionTime * 60);
  // const socket = io("http://localhost:5050");

  function initialBreakTime() {
    let breakTime = 10;
    const cookie = document.cookie.split('; ').find(row => row.startsWith('breakTime'));
    if (cookie) {
      breakTime = Number(cookie.split('=')[1]);
    }
    return breakTime;
  }

  function initialSessionTime() {
    let sessionTime = 25;
    const cookie = document.cookie.split('; ').find(row => row.startsWith('sessionTime'));
    if (cookie) {
      sessionTime = Number(cookie.split('=')[1]);
    }
    return sessionTime;
  }

  useEffect(() => {
    if (!sessionInProgress && !breakInProgress) {
      setTimeLeft(breakInProgress ? breakTime * 60 : sessionTime * 60);
    }
  }, [breakTime, sessionTime]);

  return (
    <div class="app">
      <HandleKeyboardButton />
      <div class="container col-8">

        <div class="row py-4">
          <div class="align-self-center col-sm-6 col-12">
            <BreakTime breakTime={breakTime} setBreakTime={setBreakTime} />
          </div>
          <div class="align-self-center col-sm-6 col-12">
            <SessionTime sessionTime={sessionTime} setSessionTime={setSessionTime} />
          </div>
        </div>

        <React.Fragment class="py-4 align-self-center">
          <PomodoroTime sessionTime={sessionTime} breakTime={breakTime}
            timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            sessionInProgress={sessionInProgress} setSessionInProgress={setSessionInProgress}
            breakInProgress={breakInProgress} setBreakInProgress={setBreakInProgress} />
        </React.Fragment>
          
        
      </div>
    </div>
  );
}

export default App;
