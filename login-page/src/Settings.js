import React, { useEffect, useState } from 'react';

const Settings = () => {
  const token = localStorage.getItem('access_token');
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    // Remove both 'light' and 'dark' classes, add current theme to body
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!token) return <p>Please log in to access settings.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Settings</h1>
      <p>This is your settings page. You can manage preferences here.</p>
      <button onClick={toggleTheme} style={{ marginTop: '1rem' }}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Settings;
