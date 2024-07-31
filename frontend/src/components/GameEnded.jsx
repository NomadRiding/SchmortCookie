import React from 'react'

const GameEnded = ({score, highScore, onPlayAgain}) => {
  return (
    <div className='game-ended'>
        <div className='trivia-title'>
            <h1>@102Foxtrot</h1>
        </div>
        <div className="high-score">
            High Score : {highScore}
        </div>
        <button onClick={onPlayAgain}>Play Again?</button>
    </div>
  )
}

export default GameEnded