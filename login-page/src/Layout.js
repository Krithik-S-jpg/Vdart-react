import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <nav
        style={{
          width: '220px',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ marginBottom: '2rem' }}>Menu</h2>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.2rem' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
              Dashboard
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              Profile
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')}>
              Settings
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#e74c3c',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: '2rem' }}>{children}</main>
    </div>
  );
};

export default Layout;
