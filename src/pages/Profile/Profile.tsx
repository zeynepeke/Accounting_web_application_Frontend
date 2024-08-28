import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile, deleteUserProfile } from '../Services/ProfileService';
import './Profile.css';

const Profile: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState<number>(0);
  const [updateDate, setUpdateDate] = useState<Date | null>(null);
  const [creationDate, setCreationDate] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUsername(data.username);
        setEmail(data.email);
        setBalance(data.balance);
        setUpdateDate(new Date(data.updatedAt));
        setCreationDate(new Date(data.createdAt));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleUpdate = async () => {
    const updatedProfile = {
      firstName,
      lastName,
      username,
      email,
      password,
      updatedAt: new Date().toISOString(),
    };

    try {
      const data = await updateUserProfile(updatedProfile);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setUsername(data.username);
      setEmail(data.email);
      setBalance(data.balance);
      setUpdateDate(new Date(data.updatedAt));
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + (error as Error).message);
    }
  };

  const handleDeleteProfile = async () => {
    if (!deletePassword) {
      window.alert('Please enter your password to delete your profile.');
      return;
    }

    try {
      await deleteUserProfile(deletePassword);
      alert('Profile deleted successfully!');
      window.location.href = '/'; // Redirect to the homepage
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Error deleting profile: ' + (error as Error).message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile">
        <h1>Profile</h1>
        {!isEditing ? (
          <>
            <div className="profile-field">
              <label>First Name: </label>
              <span>{firstName}</span>
            </div>
            <div className="profile-field">
              <label>Last Name: </label>
              <span>{lastName}</span>
            </div>
            <div className="profile-field">
              <label>Username: </label>
              <span>{username}</span>
            </div>
            <div className="profile-field">
              <label>Email: </label>
              <span>{email}</span>
            </div>
            <div className="profile-field">
              <label>Balance: </label>
              <span>{balance} ₺</span>
            </div>
            <div className="profile-field">
              <label>Last Updated: </label>
              <span>{updateDate ? updateDate.toLocaleString() : 'N/A'}</span>
            </div>
            <button className="update-profile" onClick={() => setIsEditing(true)}>Update Profile</button>
          </>
        ) : (
          <>
            <div className="profile-field">
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button className="save-changes" onClick={handleUpdate}>Save Changes</button>
              <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
            <div className="delete-section">
              <label htmlFor="deletePassword">Enter Password to Delete:</label>
              <input
                type="password"
                id="deletePassword"
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
              />
              <button className="delete-profile" onClick={handleDeleteProfile} disabled={!deletePassword}>Delete Profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
