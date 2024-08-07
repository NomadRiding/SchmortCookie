import React, { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import blank from '../assets/blankprofilepic.jpg';
import './styles/Profile.css';
import Avatar from "react-avatar-edit";

const Profile = ({ user }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [venmoLink, setVenmoLink] = useState("");
    const [zelle, setZelle] = useState("");
    const [cashApp, setCashApp] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const [imageCrop, setImageCrop] = useState('');
    const [src, setSrc] = useState("");
    const [profile, setProfile] = useState([]);
    const [pview, setPview] = useState(null);

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setBio(user.bio || "");
            setVenmoLink(user.venmoLink || "");
            setZelle(user.zelle || "");
            setCashApp(user.cashApp || "");
            setProfileImg(user.profileImg || blank);
        } else {
            console.error("User is not defined or does not have an ID.");
        }
    }, [user]);


    const profileFinal = profile.length > 0 ? profile[0].pview : blank;

    const onClose = () => {
        setPview(null);
    };

    const onCrop = (view) => {
        setPview(view);
    };

    const saveCropImage = () => {
        setProfile([...profile, { pview }]);
        setImageCrop(false);
        setProfileImg(pview);
    };

    const handleProfileImgChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substring(0, 5) === "image") {
            setProfileImg(file);
        } else {
            setProfileImg(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            console.error("User is not defined or does not have an ID.");
            return;
        }

        const userDetails = {
            email,
            firstName,
            lastName,
            bio,
            venmoLink,
            zelle,
            cashApp,
        };

        const formData = new FormData();
        formData.append("profileImg", profileImg);
        for (let key in userDetails) {
            formData.append(key, userDetails[key]);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/user/${user.id}/profile`, {
                method: "PUT",
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            console.log("Profile Updated Successfully:", data);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };


  return (
    <div>
      <h1>Update Profile</h1>
      <div className="profile_img text-center p-4">
        <div className="flex flex-column justify-content-center align-items-center">
          <img
            onClick={() => setImageCrop(true)}
            src={profileFinal}
            alt="profile image"
            className="the-profile-img"
          />
          <label htmlFor="" className="profile-name-greeting">Guest</label>
          <Dialog
            visible={imageCrop}
            header={() => (
              <p htmlFor="" className="text-2xl font-semibold textColor">
                Update Profile
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
                <button
                  className="save-button"
                  onClick={saveCropImage}
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog>
          <InputText
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileImgChange}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <input
          type="text"
          value={venmoLink}
          onChange={(e) => setVenmoLink(e.target.value)}
          placeholder="Venmo Link"
        />
        <input
          type="text"
          value={zelle}
          onChange={(e) => setZelle(e.target.value)}
          placeholder="Zelle"
        />
        <input
          type="text"
          value={cashApp}
          onChange={(e) => setCashApp(e.target.value)}
          placeholder="Cash App"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;