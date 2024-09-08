import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Auth.css";

const SigninComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      // Example: Set token in localStorage, set admin token if applicable
      alert('Signin successful');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Signin failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSignin}>
      <h1>Sign In</h1>
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
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Signin'}
      </button>
    </form>
  );
};

export default SigninComponent;
