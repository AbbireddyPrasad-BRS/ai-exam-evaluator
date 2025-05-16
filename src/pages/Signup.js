import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email.trim() || !password.trim()) {
      alert('Please fill out all fields before signing up.');
      return;
    }

    // You can add validation or backend logic here
    alert('Signup successful! Please login.');
    navigate('/');
  };

  return (
    <div className="signup-container">
        <h1 className="main-heading">AI Based Exam Paper Evaluation System</h1>

      <h2>Signup</h2>

      <input
        type="email"
        placeholder="Faculty Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="signup-password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          👁
        </button>
      </div>

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Signup;
