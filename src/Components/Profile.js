import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/authSlice';
import './Profile.css'

const UserProfile = ({ registerInfo }) => {
  const user = useSelector(selectUser);

  const userInfo = user || registerInfo;

  const generateInitials = (email) => {
    const nameParts = email.split('@')[0].split('.');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials || 'NA';
  };

  const avatarStyles = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const getAvatar = (email) => {
    const initials = generateInitials(email);
    return (
      <div style={avatarStyles}>
        {initials}
      </div>
    );
  };

  return (
    <div className='profile-container '>
    <h2>Profile</h2>
    {userInfo ? (
      <div className='profile-info'>
        <div>
          <strong>Avatar:</strong> {getAvatar(userInfo.email)}
        </div>
        <p><strong>Name:</strong> {userInfo.name || 'N/A'}</p>
        <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
      </div>
    ) : (
     <div className='no-info'><p>No information available.</p></div>
    )}
  </div>
);
};

export default UserProfile;