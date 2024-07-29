import React, { useState }  from 'react'
import './Styles.css';
import wholeCookie from '../assets/whole-cookie.png';
import cookieBite from '../assets/cookie-bite.png';

function Navbar() {
    const [currentImage, setCurrentImage] = useState(wholeCookie);
  return (
    <nav className="navbar">
        <div className="container-header">
            <a className="logo-placement" 
            onMouseEnter={() => setCurrentImage(cookieBite)}
            onMouseLeave={() => setCurrentImage(wholeCookie)}
            href="/">
            <img src={currentImage} 
            alt="Cookie Logo Image" 
            className='logo-image'/>
            Schmort Cookie</a>
        </div>

    </nav>
    
  )
}

export default Navbar