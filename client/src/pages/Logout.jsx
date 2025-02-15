// logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1'; // Adjust the path as needed

const Logout = () => {
  const navigate = useNavigate();

  // Function to handle the logout confirmation
  const handleLogout = () => {
    // Remove user-related data from local storage
    localStorage.removeItem('token'); // or your auth token key
    localStorage.removeItem('user');    // or any other user data

    // Optionally clear all of localStorage
    // localStorage.clear();

    // Navigate to the root route "/"
    navigate('/');
  };

  // Function to handle cancellation of logout
  const handleCancel = () => {
    // Navigate to the home page "/home"
    navigate('/home');
  };

  return (
    <>
      <Navbar1 />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Do you want to logout?</h2>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleLogout} style={{ padding: '10px 20px', marginRight: '10px' }}>
            Logout
          </button>
          <button onClick={handleCancel} style={{ padding: '10px 20px' }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
