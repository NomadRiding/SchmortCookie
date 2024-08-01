import React from 'react';
import './styles/TriviaStyles.css';
import cookie from '../assets/cookie.mp4';

const StartGame = ({onStart}) => {
  return (
    <div className='start-container'>

      <div className='start-game'>
          <video src={cookie} autoPlay loop muted className='start-video'/>
          <button className='start-button' onClick={onStart}>Start Game</button>
      </div>
    </div>
  )
}

export default StartGame