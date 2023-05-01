import React from 'react';
import IconButton from './IconButton';

function SessionTime({ sessionTime, setSessionTime}) {

    function handleSessionTime(sessionTime) {
        if (sessionTime > 0) {
            setSessionTime(sessionTime);
            document.cookie = `sessionTime=${sessionTime}`;
        } else {
            console.warn('Session Time should be positive!');
        }
    }

    return (
        <div class="container col-12">
            <div class="row d-flex justify-content-center">
                <div class="col d-flex justify-content-center">
                    <h5 class="text-white session-time">Session Time</h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col col-4 d-flex justify-content-end">
                    <IconButton.MinusButton onClick={() => handleSessionTime(sessionTime - 1)} />
                </div>
                <div class="col col-4 d-flex justify-content-center">
                    <h5 class="text-circular-background">{sessionTime}</h5>
                </div>
                <div class="col col-4 d-flex justify-content-start">
                    <IconButton.PlusButton onClick={() => handleSessionTime(sessionTime + 1)} />
                </div>
            </div>
        </div>
    );
}

export default SessionTime;