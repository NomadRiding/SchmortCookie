import React from 'react';
import Profile from '../components/Profile.jsx';
import Navbar from '../components/Navbar.jsx';

const ProfilePage = ({ user }) => {
  return (

    <>
        <Navbar />
        <Profile user={user} />  
    </>
  )
}

export default ProfilePage