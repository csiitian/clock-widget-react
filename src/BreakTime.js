import React from 'react';
import IconButton from './IconButton';

function BreakTime({ breakTime, setBreakTime }) {

    function handleBreakTime(breakTime) {
        if (breakTime > 0) {
            setBreakTime(breakTime);
            document.cookie = `breakTime=${breakTime}`;
        } else {
            console.warn('Break Time should be positive!');
        }
    }

    return (
        <div class="container col-12">
            <div class="row d-flex justify-content-center">
                <div class="col d-flex justify-content-center">
                    <h5 class="text-white break-time">Break Time</h5>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col col-4 d-flex justify-content-end">
                    <IconButton.MinusButton onClick={() => handleBreakTime(breakTime - 1)} />
                </div>
                <div class="col col-4 d-flex justify-content-center">
                    <h5 class="text-circular-background">{breakTime}</h5>
                </div>
                <div class="col col-4 d-flex justify-content-start">
                    <IconButton.PlusButton onClick={() => handleBreakTime(breakTime + 1)} />
                </div>
            </div>
        </div>
    );
}

export default BreakTime;