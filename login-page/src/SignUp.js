import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameParts = fullName.trim().split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(' ') || '';

    try {
      const res = await axios.post('https://vdart-proj-r05z.onrender.com/api/register/', {
        username,
        email,
        password1,
        password2,
        first_name,
        last_name
      });
      alert('Registration successful! You can now log in.');
      navigate('/');
    } catch (err) {
      alert('Registration failed. Check your input or try a different username.');
      console.error(err.response?.data);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-hero-text">
          <h1>Create Account</h1>
          <p>Fill in the form below to get started.</p>
        </div>
      </div>

      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder=" "
              id="fullName"
            />
            <label htmlFor="fullName">Full Name</label>
          </div>
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              id="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              placeholder=" "
              id="password1"
            />
            <label htmlFor="password1">Password</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              placeholder=" "
              id="password2"
            />
            <label htmlFor="password2">Confirm Password</label>
          </div>
          <button type="submit">Sign Up</button>
          <p style={{ marginTop: '1.5rem', color: '#94a3b8', alignSelf: 'center' }}>
            Already have an account?{' '}
            <Link to="/" style={{ color: '#3b82f6', fontWeight: '700', textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
