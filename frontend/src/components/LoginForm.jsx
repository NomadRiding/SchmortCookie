import React, { useState } from 'react';
import './styles/LoginForm.css';
import { Switch } from '@mui/material';


const LoginForm = ({ onLogin, onRegister }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleForm = () => setIsRegistering(!isRegistering);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { phone, password };

        try {
            const endpoint = isRegistering ? 'register' : 'login';
            const response = await fetch(`http://localhost:8080/api/user/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.status} ${errorData.error}: ${errorData.message}`);
            }

            const data = await response.json();
            console.log(isRegistering ? 'New User Registered:' : 'User Logged In:', data);

            if (isRegistering) {
                onRegister(data);
            } else {
                onLogin(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <>
        <div className="loginBody">

        <div className='form-container'>
            {/* <div className='image-source'>
                <img
                
                src='https://www.onceuponachef.com/images/2021/11/Best-Chocolate-Chip-Cookies-760x950.jpg'
                alt='Sand Clock'
                className='image-login'
                />
                </div> */}
            <div className="login-container">
            <div className="entry-form">

            <form onSubmit={handleSubmit}>
                <div className='register-div'>
                    <p className='register-toggle'>Register</p>
                    <Switch className='register-switch' checked={isRegistering} onChange={toggleForm} inputProps={{'arial-label': 'controlled'}} />
                </div>
                <div className='form-input'>
                    <label htmlFor='phone'></label>
                    <input
                        type='text'
                        id='phone'
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