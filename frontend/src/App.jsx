import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import LoginForm from './components/LoginForm';  // Import LoginForm
import './App.css';
import Trivia from './components/Trivia';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    console.log('New User Added:', userData);
  }

  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
        </Routes>

        {/* <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<HomePage user={user} />} />
          ) : (
            <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          )}
        </Routes> */}
      </div>

  );
}

export default App;