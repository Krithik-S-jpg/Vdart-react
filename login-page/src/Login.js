import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://vdart-proj-r05z.onrender.com', {
        username,
        password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      alert('Login successful!');
      navigate('/dashboard'); // or wherever you want to redirect after login
    } catch (error) {
      alert('Login failed! Please check your credentials and try again.');
      console.error(error.response?.data);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-hero-text">
          <h1>Welcome Back!</h1>
          <p>Enter your credentials to access your account.</p>
        </div>
      </div>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder=" "
              id="username"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-group">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              id="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit">Login</button>
          <p style={{ marginTop: '1.5rem', color: '#94a3b8', alignSelf: 'center' }}>
            Don't have an account?{' '}
            <Link to="/SignUp" style={{ color: '#3b82f6', fontWeight: '700', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
