import React from 'react'

const StartGame = ({onStart}) => {
  return (
    <div className='start-game'>
        <button onClick={onStart}>Start Game</button>
    </div>
  )
}

export default StartGame