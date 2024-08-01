import React from 'react'

const GameEnded = ({score, highScore, onPlayAgain}) => {
  return (

    <div className='game-end-container'>

    <div className='game-ended'>
        <div className='trivia-title'>
            <h1>@102Foxtrot</h1>
        </div>
        <div className="end-game-high-score">
            High Score:  
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