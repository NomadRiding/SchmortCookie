import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import LoginForm from './components/LoginForm';
import './App.css';
import ProfilePage from './pages/ProfilePage';
import TriviaPage from './pages/TriviaPage';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
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
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/trivia" element={<TriviaPage user={user} />} />
            </>
          ) : (
            <Route path="/" element={<LoginForm onLogin={handleLogin} onRegister={handleRegister}/>} />
          )}
        </Routes>
      </div>

  );
}

export default App;