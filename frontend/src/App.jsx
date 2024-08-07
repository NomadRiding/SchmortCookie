import React, { useEffect, useState } from 'react';
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

  const url = `http://localhost:8080/api/user/${localStorage.getItem("loggedIn")}`;
  console.log('Fetching URL:', url);

  const checkedLoggedIn = async (e) => {      
    try {
        const userId = localStorage.getItem("loggedIn");
        if (!userId) {
            throw new Error('No user ID found in local storage');
        }

        const url = `http://localhost:8080/api/user/${userId}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${errorData.status} ${errorData.error}: ${errorData.message}`);
        }

        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data);
      

    } catch (error) {
        console.error('Error:', error.message); // Debugging: Handle and display errors
    }
};


  useEffect(() => {
    if(localStorage.getItem("loggedIn") && !isLoggedIn){
      checkedLoggedIn()
    }
  },[])

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


  console.log(isLoggedIn);

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