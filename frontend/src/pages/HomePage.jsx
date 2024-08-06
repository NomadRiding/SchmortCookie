import React from 'react';
import { Link } from "react-router-dom";
import '../components/styles/Homepage.css';
import trivia from '../components/Trivia';
import StartGame from '../components/StartGame';
import smartCookie from '../assets/smartcookiebooks.jpg';


const HomePage = ({ user }) => {
  return (
    <>
      <div className="homePage-container">
        <h1>Choose Your Game</h1>
        <div className="trivia-play-qa">
          <Link to="/trivia">
          <img src={smartCookie} className='play-qa-img'/>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage