import React, { useEffect } from 'react';
import TimerComponent from './CountDown';

const TriviaGame = ({ questions, currentQuestionIndex, score, onAnswer, onTimerEnd, selectedAnswer }) => {
    
    const currentQuestion = questions[currentQuestionIndex];

    const shuffledOptions = () => {
        const options = [currentQuestion.correctAnswer, ...currentQuestion.options];
        return options.sort(() => Math.random() - 0.5);
    }

    return (
        <div className='trivia-game-boundaries'>
            <div className='trivia-app'>
                <TimerComponent onTimerEnd={onTimerEnd} />
                <div className="trivia-title">
                    <h1>@102Foxtrot</h1>
                </div>
                <div className="score">{score}</div>
            </div>
            <div className="question">{currentQuestion ? currentQuestion.question : "Loading"}</div>
            <div className="answers">
                <ul>
                    {currentQuestion &&
                        shuffledOptions().map((option, index) => (
                            <li
                                key={index}
                                onClick={() => onAnswer(option)}
                                className={
                                    selectedAnswer
                                        ? option === currentQuestion.correctAnswer
                                            ? 'correct-answer'
                                            : option === selectedAnswer
                                                ? 'incorrect-answer'
                                                : ''
                                        : ''
                                }
                            >
                                {option}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default TriviaGame;