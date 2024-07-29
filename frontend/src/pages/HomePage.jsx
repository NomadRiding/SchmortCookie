import React from 'react';
import { Link } from "react-router-dom";
import '../components/Homepage.css';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import Trivia from '../components/Trivia';

function HomePage() {
  return (
    <div>
        <LoginForm />
        {/* <Trivia /> */}
    </div>
  )
}

export default HomePage