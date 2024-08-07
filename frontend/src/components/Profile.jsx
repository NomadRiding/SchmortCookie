import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import blank from '../assets/blankprofilepic.jpg';
import './styles/Profile.css';
import Avatar from "react-avatar-edit";


const Profile = ( {user} ) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [venmoLink, setVenmoLink] = useState("");
  const [zelle, setZelle] = useState("");
  const [cashApp, setCashApp] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [imageCrop, setImageCrop] = useState('');
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setPview] = useState(false);

  const profileFinal = profile.map((item) => item.pview);

  const onClose = () => {
    setPview(null);
  }

  const onCrop = (view) => {
    setPview(view);
  }

  const saveCropImage = () => {
    setProfile([...profile, {pview}]);
    setImageCrop(false);
  }

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);
  const handleVenmoLinkChange = (e) => setVenmoLink(e.target.value);
  const handleZelleChange = (e) => setZelle(e.target.value);
  const handleCashApp = (e) => setCashApp(e.target.value);
  const handleProfileImg = (e) => setProfileImg(e.target.value);

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
      profileImg,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userId}/profile`,
        {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        return;
      }

      const data = await response.json();
      setSuccessMessage("Profile Updated Successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <div className="profile_img text-center p-4">
        <div className="flex flex-column justify-content-center align-items-center">
          <img 
          onClick={() => setImageCrop(true)}
          src={profile.length ? profileFinal : blank} 
          alt="profile image" 
          className="the-profile-img" />
          <label htmlFor="" className="profile-name-greeting">Guest</label>
          <Dialog 
            visible={imageCrop}
              header={() => (
                <p htmlFor="" className="text-2xl font-semibold textColor">
                  UpdateProfile
                </p>
              )}
              onHide={() => setImageCrop(false)}
          >
            <div className="profile-image-setting">
              <Avatar 
                width={500}
                height={400}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
                shadingColor={"#474649"}
                backgroundColor={"#474649"}
              />
              <div className="pic-change-button">
                <div>
                  <button 
                    className="save-button"
                    onClick={saveCropImage}
                    label="save"
                    icon="pi pi-check"
                  >Save </button>
                </div>
              </div>
            </div>

          </Dialog>
          <InputText type="file" 
            accept="/image/*"
            style={{display: "none"}}

            onChange={(e) => {
              const file = e.target.files[0];
              if(file && file.type.substring(0,5) === "image") {
                setProfileImg(file);
              } else {
                setProfileImg(null)
              }
            }}
          />
        </div>
      </div>
      {/* <ProfileImg /> */}
      {/* {errorMessage && (
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
        
      </div> */}
    </div>
  );
};

export default Profile;
