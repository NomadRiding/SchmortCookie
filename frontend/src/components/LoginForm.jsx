import React, { useState } from 'react';
import './styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { phone, password };
        console.log(user); // Debugging: Confirm user data

        try {
            const response = await fetch('http://localhost:8080/api/user/add', {
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
            console.log('New User Added:', data);

            // Call onLogin to update the global state in App.jsx
            onLogin(data);

        } catch (error) {
            console.error('Error:', error.message); // Debugging: Handle and display errors
        }
    };

    return (
        <div className='form-container'>
            <div className='image-source'>
                <img
                    src='https://www.onceuponachef.com/images/2021/11/Best-Chocolate-Chip-Cookies-760x950.jpg'
                    alt='Sand Clock'
                    className='image-login'
                />
            </div>
            <form onSubmit={handleSubmit}>
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
                <button className='submit-button' type='submit'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;