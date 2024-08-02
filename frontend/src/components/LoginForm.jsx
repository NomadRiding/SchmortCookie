import React, { useState } from 'react';
import './styles/LoginForm.css';
import './styles/TriviaStyles.css';
import cookie from '../assets/cookie.mp4';
import { Switch } from '@mui/material';

const LoginForm = ({ onLogin, onRegister }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        setPhone(numericValue);
        };
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleForm = () => {
        setErrorMessage('');
        setIsRegistering(!isRegistering);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { phoneNumber: phone, password };

        try {
            const endpoint = isRegistering ? 'register' : 'login';
            const response = await fetch(`http://localhost:8080/api/user/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "An unexpected error occurred.");
                return;  // Exit early if there's an error
            }

            const data = await response.json();
            console.log(isRegistering ? 'New User Registered:' : 'User Logged In:', data);

            if (isRegistering) {
                if (typeof onRegister === 'function') {
                    onRegister(data);
                } else {
                    console.error('onRegister is not a function');
                }
            } else {
                if (typeof onLogin === 'function') {
                    onLogin(data);
                } else {
                    console.error('onLogin is not a function');
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('An unexpected error occurred.');
        }
    };

    return (
        <>
        <div className="loginBody">
            <div className='form-container'>
                <video src={cookie} autoPlay loop muted className='start-video'/>
                <div className="login-container">
                    <div className="entry-form">
                        <form onSubmit={handleSubmit}>
                            <div className='register-div'>
                                <p className='register-toggle'>Register</p>
                                <Switch className='register-switch' checked={isRegistering} onChange={toggleForm} inputProps={{'arial-label': 'controlled'}} />
                            </div>
                            {errorMessage && (
                                <div className="error-message">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            <div className='form-input'>
                                <label htmlFor='phone'></label>
                                <input
                                    type='text'
                                    id='phone'
                                    pattern="[0-9]*" 
                                    inputMode="numeric"         
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder='Phone number:'
                                    required
                                />
                            </div>
                            <div className='form-input'>
                                <label htmlFor='password'></label>
                                <input
                                    type='password'
                                    id='password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder='Password:'
                                    required
                                />
                            </div>
                            <div>
                                <button className='submit-button' type='submit'>
                                    {isRegistering ? 'Register' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginForm;