import React, { useState } from 'react'

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [venmo, setVenmo] = useState('');
  const [zelle, setZelle] = useState('');
  const [cashApp, setCashApp] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);
  const handleVenmoChange = (e) => setVenmo(e.target.value);
  const handleZelleChange = (e) => set


  return (
    <div>Profile</div>
  )
}

export default Profile