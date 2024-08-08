import React, { useState, useEffect } from "react";
import defaultProfileImageUrl from "../assets/blankprofilepic.jpg";
import Navbar from "./Navbar";
import "./styles/Profile.css";

const Profile = ({ user }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [venmoLink, setVenmoLink] = useState("");
  const [zelle, setZelle] = useState("");
  const [cashApp, setCashApp] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    defaultProfileImageUrl
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/${user.id}/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profileData = await response.json();
        setEmail(profileData.email);
        setFirstName(profileData.firstName);
        setLastName(profileData.lastName);
        setBio(profileData.bio);
        setVenmoLink(profileData.venmoLink);
        setZelle(profileData.zelle);
        setCashApp(profileData.cashApp);

        const imageUrl = profileData.profileImg || defaultProfileImageUrl;
        setProfileImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, [user.id]);

  const handleImg = (e) => {
    setProfileImg(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profileImg) {
      formData.append("profileImg", profileImg);
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
    formData.append("userDetails", JSON.stringify(userDetails));

    console.log("FormData being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${user.id}/profile`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      const textResponse = await response.text();
      try {
        const jsonResponse = JSON.parse(textResponse);
        if (!response.ok) {
          throw new Error(jsonResponse.error);
        }
        console.log("Profile Updated Successfully:", jsonResponse);
        if (jsonResponse.profileImageUrl) {
          setProfileImageUrl(jsonResponse.profileImageUrl);
        }

        fetchProfile();
      } catch (e) {}
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div className="profile-container">
        <div className="smaller-container">

        {profileImageUrl && (
          <div className="profile-img-icon">
            <img
              
              src={profileImageUrl}
              alt="Profile"
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }}
              onError={(e) => (e.target.src = defaultProfileImageUrl)}
              />
          </div>
        )}
        <div>
          <h1>
            {firstName} {lastName}
          </h1>
        </div>
        <div className="bio-section">🧑‍💻 {bio}</div>
        </div>
        <div className="form-section-container">

        <form className="form-section" onSubmit={handleSubmit}>
          <input type="file" name="file" onChange={handleImg} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            />
          <input
            type="text"
            placeholder="Zelle"
            value={zelle}
            onChange={(e) => setZelle(e.target.value)}
            />
          <input
            type="text"
            placeholder="CashApp"
            value={cashApp}
            onChange={(e) => setCashApp(e.target.value)}
            />

          <button type="submit">Submit</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
