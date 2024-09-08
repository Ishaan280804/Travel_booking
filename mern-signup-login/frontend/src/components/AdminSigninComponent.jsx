import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Auth.css";

const AdminSigninComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Ensure the URL matches your backend endpoint
      const response = await axios.post('http://localhost:5000/api/auth/adminSignin', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Signin successful');
    } catch (error) {
      console.error('Signin error:', error); // Log full error
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Signin failed. Please try again later.');
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSignin}>
      <h1>Admin Sign In</h1>
      <input
        className="form-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button className="form-button" type="submit">Signin</button>
    </form>
  );
};

export default AdminSigninComponent;
