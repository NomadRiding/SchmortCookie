import React from 'react';
import Profile from '../components/Profile.jsx';

const ProfilePage = ({ user }) => {
  return (
    <div>
        <Profile user={user} />  
    </div>
  )
}

export default ProfilePage