import React, { useEffect, useState } from 'react';

const Profile = () => {
  const token = localStorage.getItem('access_token');

  const [profile, setProfile] = useState({ username: '', email: '', name: '' });
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // success or error

  useEffect(() => {
    if (!token) return;

    async function fetchProfile() {
      try {
        const res = await fetch('https://vdart-proj-r05z.onrender.com', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setNewName(data.name || '');
          setNewEmail(data.email || '');
        } else {
          console.error('Failed to load profile');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    }

    fetchProfile();
  }, [token]);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000); // clear after 4 seconds
  };

  const handleNameChange = async () => {
    try {
      const res = await fetch('https://vdart-proj-r05z.onrender.com', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (res.ok) {
        setProfile(prev => ({ ...prev, name: newName }));
        showMessage('Name updated successfully.', 'success');
      } else {
        showMessage('Failed to update name.', 'error');
      }
    } catch (err) {
      console.error(err);
      showMessage('Error updating name.', 'error');
    }
  };

  const handleEmailChange = async () => {
    try {
      const res = await fetch('https://vdart-proj-r05z.onrender.com', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (res.ok) {
        setProfile(prev => ({ ...prev, email: newEmail }));
        showMessage('Email updated successfully.', 'success');
      } else {
        showMessage('Failed to update email.', 'error');
      }
    } catch (err) {
      console.error(err);
      showMessage('Error updating email.', 'error');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await fetch('https://vdart-proj-r05z.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (res.ok) {
        setCurrentPassword('');
        setNewPassword('');
        showMessage('Password changed successfully.', 'success');
      } else {
        showMessage('Failed to change password.', 'error');
      }
    } catch (err) {
      console.error(err);
      showMessage('Error changing password.', 'error');
    }
  };

  return (
    <>
      <div
        style={{
          padding: '2rem',
          width: '80vw',
          height: '90vh', // full viewport height
          margin: 0,
          fontFamily: 'Arial, sans-serif',
          overflowY: 'auto',
          backgroundColor: 'transparent',
          color: '#333333',
          boxSizing: 'border-box',
        }}
        className="scroll-container"
      >
        <h1>My Profile</h1>

        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>

        <hr style={{ margin: '2rem 0', borderColor: '#444' }} />

        <h3>Update Name</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={handleNameChange} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
          Save Name
        </button>

        <h3>Update Email</h3>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={handleEmailChange} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
          Save Email
        </button>

        <hr style={{ margin: '2rem 0', borderColor: '#444' }} />

        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={handlePasswordChange} style={{ padding: '0.5rem 1rem' }}>
          Change Password
        </button>

        {message && (
          <p style={{ marginTop: '1rem', color: messageType === 'success' ? 'lightgreen' : 'salmon' }}>
            {message}
          </p>
        )}
      </div>

      <style>{`
        /* Scrollbar styles on scroll-container */
        .scroll-container::-webkit-scrollbar {
          width: 10px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: #222;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background-color: #1976d2;
          border-radius: 10px;
          border: 2px solid #222;
        }

        /* Firefox scrollbar */
        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #1976d2 #222;
        }
      `}</style>
    </>
  );
};

export default Profile;
