import React from 'react';
import { Link } from "react-router-dom";
import '../components/styles/Homepage.css';
import Trivia from '../components/Trivia';

const HomePage = ({ user }) => {
  return (
      // <div className='welcome-message'>
      //     <h1>Welcome, GUEST!</h1>
      //     <ul>
      //       <li></li>
      //     </ul>
      // </div>
      <Trivia />
  )
}

export default HomePage