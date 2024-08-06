import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import wholeCookie from '../assets/whole-cookie.png';
import cookieBite from '../assets/cookie-bite.png';
import cookie from '../assets/cookie.mp4';
import HomePage from '../pages/HomePage';

function Navbar() {
    const [currentImage, setCurrentImage] = useState(wholeCookie);
  return (
    <>
    <div className='nav-container'>
      <nav className="navbar">
      <video src={cookie} autoPlay loop muted className='entry-video'/>
          <div className="container-header">
            <Link to='/' className='logo-placement'
            
            onMouseEnter={() => setCurrentImage(cookieBite)}
            onMouseLeave={() => setCurrentImage(wholeCookie)}
            >

            
              <img src={currentImage} 
              alt="Cookie Logo Image" 
              className='logo-image'/>
              <h1 className='title-h1'>Schmort Cookie</h1>
          </Link>
        </div>
      </nav>
      <div className='profile-navbar-button'>
        <Link to={HomePage}>Go to Profile</Link>
      </div>
    </div>
    </>
    
  )
}

export default Navbar