import React from 'react';
import './TriviaStyles.css';
import TimerComponent from './CountDown';

function Trivia() {
    return (
        <div className='trivia-container'>
            <div className='trivia-app'>
                <div className="timer">
                    <TimerComponent />
                </div>
                <div className="trivia-title">
                    <h1>Trivia</h1>
                </div>
                <div className="score">1</div>
                <div className="question">Question</div>
                <div className="answers">
                    <ul>
                        <li>answer1</li>
                        <li>answer2</li>
                        <li>answer3</li>
                        <li>answer4</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Trivia;