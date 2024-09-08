import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Auth.css";

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');  // Reset error
    try {
      await axios.post('/api/auth/signup', { name, email, password });
      alert('Signup successful');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);  // Display server error
      } else {
        setError('Signup failed. Please try again later.');
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSignup}>
      <h1>Sign Up</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button className="form-button" type="submit">Signup</button>
    </form>
  );
};

export default SignupComponent;
