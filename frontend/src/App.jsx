import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import LoginForm from './components/LoginForm';
import './App.css';
import Trivia from './components/Trivia';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    console.log('User logged in:', userData);
    navigate('/')
  }

  const handleRegister = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    console.log('New User Added:', userData);
    navigate('/')
  }



  return (
      <div>
         {/* <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          </Routes> */}

        <Routes>
          {isLoggedIn ? (
            <>
            <Route path="/" element={<HomePage user={user} />} />
            </>
          ) : (
            <Route path="/" element={<LoginForm onLogin={handleLogin} onRegister={handleRegister}/>} />
          )}
        </Routes>
      </div>

  );
}

export default App;