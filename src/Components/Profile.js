import React,{useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUser, setUser,setLoading, setError } from '../Redux/authSlice';
import './Profile.css'

const UserProfile = ({ registerInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectUser);

  const userInfo = user || registerInfo;

  useEffect(() => {
    console.log('User from Redux store:', user);  
    if (user === undefined) {
      setLoading(true);
    } else if (user === null) {
      setError('No user found');
    } else {
      setLoading(false); 
    }
  }, [user]);

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

  const handleLogout = () => {
    dispatch(setUser(null));  
    localStorage.removeItem('User');  
    navigate('/login'); 
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
        <button className="buy-button" onClick={handleLogout}>Logout</button>
      </div>
    ) : (
     <div className='no-info'><p>No information available.</p></div>
    )}
  </div>
);
};

export default UserProfile;