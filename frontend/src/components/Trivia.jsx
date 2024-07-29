import React, { useEffect, useState } from 'react';
import './styles/TriviaStyles.css';
import TimerComponent from './CountDown';

const Trivia = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
    const [score, setScore] = useState(0); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswering, setIsAnswering] = useState(false); 

    useEffect(() => {
        fetch('http://localhost:8080/api/questions')
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch questions')
            }
            return response.json();
        })
        .then(data => {
            setQuestions(shuffleArray(data));
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        })
    }, []);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const handleAnswerClick = (selectedOption) => {
        if (isAnswering) return; 
        setSelectedAnswer(selectedOption);
        setIsAnswering(true); 
        
        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < questions.length) {
                setCurrentQuestionIndex(nextIndex);
            } else {
                // Quiz completed
                setCurrentQuestionIndex(0);
                setScore(0);
                setQuestions(shuffleArray(questions));
            }
            setSelectedAnswer(null);
            setIsAnswering(false);
        }, 1000); 
    }

    if (loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>


    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className='trivia-container'>
            <div className='trivia-game-boundaries'>
            {/* <div className="spacer"></div> */}
            <div className='trivia-app'>
                <div className="timer">
                    <TimerComponent />
                </div>
                <div className="trivia-title">
                    <h1>@102Foxtrot</h1>
                </div>
                <div className="score">{score}</div>
            </div>
            {/* <div className="spacer-sml"></div> */}
            <div className="question">{currentQuestion ? currentQuestion.question : "Loading"}</div>
            {/* <div className="spacer"></div> */}
            <div className="answers">
            <ul>
                        {currentQuestion &&
                            shuffleArray([currentQuestion.correctAnswer, ...currentQuestion.options]).map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleAnswerClick(option)}
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
        </div>
    );
}

export default Trivia;