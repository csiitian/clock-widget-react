import React, { useEffect, useState } from 'react';
import './button.css';
import StateEnum from './StateEnum';

function PomodoroTime({ sessionTime, breakTime, timeLeft, setTimeLeft, sessionState, setSessionState, breakState, setBreakState }) {

    const [intervalId, setIntervalId] = useState(null);
    const [audio, setAudio] = useState(new Audio('/audio/wake-up.mp3'));

    function playSound() {
        audio.play();
    }

    function handleStartStop() {
        // STOP -> START -> PAUSED -> START -> PAUSED ...
        if(sessionState === StateEnum.PAUSED) {
            setSessionState(StateEnum.STARTED);
        } else if(breakState === StateEnum.PAUSED) {
            setBreakState(StateEnum.STARTED);
        } else if(sessionState === StateEnum.STARTED) {
            setSessionState(StateEnum.PAUSED);
        } else if(breakState === StateEnum.STARTED) {
            setBreakState(StateEnum.PAUSED);
        } else if(sessionState === StateEnum.STOPPED) {
            setSessionState(StateEnum.STARTED);
        } else if(breakState === StateEnum.STOPPED) {
            setBreakState(StateEnum.STARTED);
        }
    }

    function handleReset() {
        // handle reset of session or break
        setSessionState(StateEnum.STOPPED);
        setBreakState(StateEnum.STOPPED);
        setTimeLeft(sessionTime * 60);
    }

    function handleTimerEnd() {
        // handle end of session or break
        playSound();
        if (sessionState === StateEnum.STARTED) {
            console.log('Session Completed, Take Rest Now!');
        }
        if (breakState === StateEnum.STARTED) {
            console.log('Break Completed, It\'s time to focus now!');
        }
        setTimeout(() => {
            if(sessionState === StateEnum.STARTED) {
                setSessionState(StateEnum.STOPPED);
                setBreakState(StateEnum.STARTED);
            } else if(breakState === StateEnum.STARTED) {
                setBreakState(StateEnum.STOPPED);
                setSessionState(StateEnum.STARTED);
            }
            setTimeLeft(breakState === StateEnum.STARTED ? breakTime * 60 : sessionTime * 60);
        }, 5000);
    }

    function formatTimeLeft() {
        // format time left in mm:ss
        let minutes = Math.floor(timeLeft / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return `${minutes}:${seconds}`;
    }

    useEffect(() => {
        // handle start of session or break
        if (sessionState === StateEnum.STARTED || breakState === StateEnum.STARTED) {
            // set audio for end of session or break
            if(sessionState === StateEnum.STARTED) setAudio(new Audio('/audio/time-up.mp3'));
            if(breakState === StateEnum.STARTED) setAudio(new Audio('/audio/wake-up.mp3'));

            // start timer
            const interval = setInterval(() => {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft => timeLeft - 1);
                }
            }, 1000);
            setIntervalId(interval)
            return () => clearInterval(interval);
        }
    }, [sessionState, breakState]);

    useEffect(() => {
        // handle end of timer
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            handleTimerEnd();
        }
    }, [timeLeft]);

    return (
        <div class="container col-12">
            <div class="container pomodoro-circular-container">
                <h3 id="timer-label" class="align-self-center">{breakState !== StateEnum.STOPPED ? 'Break' : 'Session'}</h3>
                <div class="row d-flex justify-content-center">
                    <div class="col align-self-center">
                        <h1 id="time-left">{formatTimeLeft()}</h1>
                    </div>
                </div>
            </div>
            <div class="row py-4 d-flex justify-content-center">
                <div class="col d-flex justify-content-end">
                    <button id="start_stop" class="btn btn-outline-secondary text-white btn-sm" 
                        onClick={handleStartStop}>{sessionState !== StateEnum.STOPPED || breakState !== StateEnum.STOPPED ? 'STOP' : 'START'}</button>
                </div>
                <div class="col d-flex justify-content-start">
                    <button id="reset" class="btn btn-outline-secondary text-white btn-sm" 
                        onClick={handleReset}>RESET</button>
                </div>
            </div>
        </div>
    );
}

export default PomodoroTime;