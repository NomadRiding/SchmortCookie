import React, { useState } from 'react'

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [venmoLink, setVenmoLink] = useState('');
  const [zelle, setZelle] = useState('');
  const [cashApp, setCashApp] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);
  const handleVenmoLinkChange = (e) => setVenmoLink(e.target.value);
  const handleZelleChange = (e) => setZelle(e.target.value);
  const handleCashApp = (e) => setCashApp(e.target.value);
  const handleProfileImg = (e) => setProfileImg(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = {
      email,
      firstName,
      lastName,
      bio,
      venmoLink,
      zelle,
      cashApp,
      profileImg
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}/profile`, {
        method: `PUT`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }

      const data = await response.json();
      setSuccessMessage('Profile Updated Successfully')
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('An unexpected error occurred.');
    }
  }



  return (
    <div>
      <h1>Update Profile</h1>
      {errorMessage && (
        <div className='error-message'>
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      <div className='profile-section'>
        <input type="email" value={email} onChange={handleEmailChange(setEmail)} placeholder="Email" />
        
      </div>

    </div>
  )
}

export default Profile