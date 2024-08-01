import React, { useState }  from 'react'
import './styles/Navbar.css';
import wholeCookie from '../assets/whole-cookie.png';
import cookieBite from '../assets/cookie-bite.png';
import cookie from '../assets/cookie.mp4';

function Navbar() {
    const [currentImage, setCurrentImage] = useState(wholeCookie);
  return (
    <>
    <div className='nav-container'>
      <nav className="navbar">
      <video src={cookie} autoPlay loop muted className='entry-video'/>
          <div className="container-header">
              <a className="logo-placement" 
              onMouseEnter={() => setCurrentImage(cookieBite)}
              onMouseLeave={() => setCurrentImage(wholeCookie)}
              href="/">
              <img src={currentImage} 
              alt="Cookie Logo Image" 
              className='logo-image'/>
              <h1 className='title-h1'>Schmort Cookie</h1></a>
          </div>
      </nav>
    </div>
    </>
    
  )
}

export default Navbar