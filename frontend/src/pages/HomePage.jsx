import React from 'react';
import { Link } from "react-router-dom";
import '../components/styles/Homepage.css';
import trivia from '../components/Trivia';
import StartGame from '../components/StartGame';
import smartCookie from '../assets/smartcookiebooks.jpg';
import soon from '../assets/comingSoon.jpg';



const HomePage = ({ user }) => {
  return (
    <>
      <div className="homePage-container">
        <div className='game-list'>
        <h1 className='pick-game-title'>Choose Your Game</h1>
          <div className="games-section">
            <div className="trivia-play-qa">
              <Link className='game-link' to="/trivia">
              <img src={smartCookie} className='play-qa-img'/>
              <h1 className='game-title'>Trivia</h1>
              </Link>
            </div>
            <div className="trivia-play-qa">
              <Link className='game-link' to="#">
              <img src={soon} className='play-qa-img'/>
              <h1 className='game-title'>Picture Trivia</h1>
              </Link>
            </div>
            <div className="trivia-play-qa">
              <Link className='game-link' to="#">
              <img src={soon} className='play-qa-img'/>
              <h1 className='game-title'>True or False</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage