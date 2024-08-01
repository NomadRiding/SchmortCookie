import React, { useEffect, useState } from 'react';
import TimerComponent from './CountDown';

const TriviaGame = ({ questions, currentQuestionIndex, score, onAnswer, onTimerEnd, selectedAnswer }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        if (currentQuestion) {
            const options = [currentQuestion.correctAnswer, ...currentQuestion.options];
            setShuffledOptions(shuffleArray(options));
        }
    }, [currentQuestion]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const getClassName = (option) => {
        if (!selectedAnswer) return '';
        if (option === currentQuestion.correctAnswer) return 'correct-answer';
        if (option === selectedAnswer) return 'incorrect-answer';
        return '';
    };

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
                        shuffledOptions.map((option) => (
                            <li
                                key={option}
                                onClick={() => onAnswer(option)}
                                className={getClassName(option)}
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