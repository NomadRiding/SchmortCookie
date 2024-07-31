import React, { useEffect, useState } from 'react';
import './styles/TriviaStyles.css';
import StartGame from './StartGame';
import TriviaGame from './TriviaGame';
import GameEnded from './GameEnded';

const Trivia = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/questions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                return response.json();
            })
            .then(data => {
                setQuestions(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleStartGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameRunning(true);
        setIsGameEnded(false);
    };

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
                setIsGameRunning(false);
                setIsGameEnded(true);
                if (score > highScore) {
                    setHighScore(score);
                }
            }
            setSelectedAnswer(null);
            setIsAnswering(false);
        }, 1000);
    };

    const handleTimerEnd = () => {
        setIsGameRunning(false);
        setIsGameEnded(true);
        if (score > highScore) {
            setHighScore(score);
        }
    };

    const handlePlayAgain = () => {
        setIsGameEnded(false);
        handleStartGame();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='trivia-container'>
            {!isGameRunning && !isGameEnded && (
                <StartGame onStart={handleStartGame} />
            )}
            {isGameRunning && (
                <TriviaGame
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    score={score}
                    onAnswer={handleAnswerClick}
                    onTimerEnd={handleTimerEnd}
                    selectedAnswer={selectedAnswer}
                />
            )}
            {isGameEnded && (
                <GameEnded
                    score={score}
                    highScore={highScore}
                    onPlayAgain={handlePlayAgain}
                />
            )}
        </div>
    );
}

export default Trivia;