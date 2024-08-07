import React from 'react'
import './styles/GameEnd.css';
import floatingCookies from '../assets/circleCookie.jpg';

const GameEnded = ({score, highScore, onPlayAgain}) => {
  return (

    <div className='game-end-container'>
    <img className='background-image-cover' src={floatingCookies} alt="" />
    <div className='game-ended'>
        <div className='trivia-title'>
            <h1>@102Foxtrot</h1>
        </div>
        <div className="end-game-your-score">
            Your Score:  
            <div className='High-score-number'>
                {highScore}
            </div>
        </div>
        <button className="play-again-button" onClick={onPlayAgain}>Play Again?</button>
    </div>
</div>
  )
}

export default GameEnded