import React, { useState } from 'react'
import './Styles.css';


const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');

    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleAuthCodeChange = (e) => setAuthCode(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        //later I'll create a fetch for authentication code here
    }
    
    return(
        <>
        <div className='form-container'>
            <div className="image-source">
                <img src={"https://www.onceuponachef.com/images/2021/11/Best-Chocolate-Chip-Cookies-760x950.jpg"} alt="Sand Clock" className='image-login'/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="phone"></label>
                    <input type="text" value={phone} onChange={handlePhoneChange} placeholder=' Phone number:' required />
                </div>
                <div className="form-input">
                    <label htmlFor="password"></label>
                    <input type="text" value={password} onChange={handlePasswordChange} placeholder=' Password:' required />
                </div>
                <button className="submit-button" type='submit'>Login</button>
            </form>
        </div>
        </>
    )
}

export default LoginForm