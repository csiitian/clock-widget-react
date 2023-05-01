import React from 'react';
import './styles.css';

function PlusButton({ onClick }) {
    return (
        <div className="rectangle-border-button" onClick={onClick}>
            <div className="text-icon">+</div>
        </div>
    );
}

function MinusButton({ onClick }) {
    return (
        <div className="rectangle-border-button" onClick={onClick}>
            <div className="text-icon">-</div>
        </div>
    );
}

export default {PlusButton, MinusButton};
